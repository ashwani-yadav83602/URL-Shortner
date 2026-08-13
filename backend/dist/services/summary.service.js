import axios from 'axios';
import { load } from 'cheerio';
import { UrlModel } from '../models/index.js';
import config from '../config/index.js';
async function fetchPageText(url) {
    const res = await axios.get(url, { timeout: 8000, responseType: 'text' });
    const $ = load(res.data);
    const title = $('meta[property="og:title"]').attr('content') || $('title').text() || '';
    const paragraphs = $('p')
        .map((i, el) => (el ? $(el).text().trim() : ''))
        .get()
        .filter(Boolean);
    const text = paragraphs.join('\n\n');
    return { title: title.trim(), text };
}
function estimateReadingTime(text) {
    const words = text.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min`;
}
function extractKeyPoints(text, max = 5) {
    const sentences = text
        .replace(/\s+/g, ' ')
        .split(/(?<=[.!?])\s+/)
        .map(s => s.trim())
        .filter(Boolean);
    return sentences.slice(0, Math.min(max, sentences.length));
}
export async function generateSummary(id) {
    const doc = await UrlModel.findById(id).exec();
    if (!doc)
        throw new Error('URL item not found');
    const { originalUrl } = doc;
    const { title: fetchedTitle, text } = await fetchPageText(originalUrl).catch(() => ({ title: '', text: '' }));
    // If OPENAI_API_KEY is present, try to create a richer structured summary via OpenAI
    if (config.OPENAI_API_KEY) {
        try {
            const prompt = `Extract a JSON object with keys: title, about, purpose, objective, keyPoints (array of short strings). Input:\nTITLE: ${fetchedTitle}\n\nTEXT:\n${(text || '').slice(0, 2000)}`;
            const resp = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'system', content: 'You output only valid JSON.' }, { role: 'user', content: prompt }],
                temperature: 0.2,
            }, {
                headers: { Authorization: `Bearer ${config.OPENAI_API_KEY}` },
                timeout: 15000,
            });
            const msg = resp.data?.choices?.[0]?.message?.content;
            if (msg) {
                // Try to parse JSON from model output
                const jsonStart = msg.indexOf('{');
                const jsonText = jsonStart >= 0 ? msg.slice(jsonStart) : msg;
                try {
                    const parsed = JSON.parse(jsonText);
                    const summary = {
                        title: parsed.title || fetchedTitle || doc.title || '',
                        about: parsed.about || (text ? text.slice(0, 800) : ''),
                        purpose: parsed.purpose || '',
                        objective: parsed.objective || '',
                        keyPoints: Array.isArray(parsed.keyPoints) ? parsed.keyPoints.slice(0, 8) : [],
                        readingTime: estimateReadingTime(text || fetchedTitle || doc.originalUrl),
                        website: (() => { try {
                            return new URL(originalUrl).hostname;
                        }
                        catch {
                            return '';
                        } })(),
                    };
                    await UrlModel.findByIdAndUpdate(id, { summary, title: summary.title }, { new: true }).exec();
                    return summary;
                }
                catch (e) {
                    // fallthrough to heuristic below
                }
            }
        }
        catch (e) {
            // ignore AI errors and fall back to heuristic
        }
    }
    const about = text ? text.slice(0, 800) : '';
    const keyPoints = text ? extractKeyPoints(text, 6) : [];
    const readingTime = estimateReadingTime(text || fetchedTitle || doc.originalUrl);
    const purpose = keyPoints[0] || '';
    const objective = keyPoints[1] || '';
    const website = (() => {
        try {
            return new URL(originalUrl).hostname;
        }
        catch {
            return '';
        }
    })();
    const summary = {
        title: fetchedTitle || doc.title || '',
        about,
        purpose,
        objective,
        keyPoints,
        readingTime,
        website,
    };
    // Persist summary object to DB
    await UrlModel.findByIdAndUpdate(id, { summary, title: summary.title }, { new: true }).exec();
    return summary;
}
export default { generateSummary };
