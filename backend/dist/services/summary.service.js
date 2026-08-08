import axios from 'axios';
import { load } from 'cheerio';
import { UrlModel } from '../models/index.js';
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
    const { title, text } = await fetchPageText(originalUrl).catch(() => ({ title: '', text: '' }));
    const about = text ? text.slice(0, 800) : '';
    const keyPoints = text ? extractKeyPoints(text, 6) : [];
    const readingTime = estimateReadingTime(text || title || doc.originalUrl);
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
        title: title || doc.title || '',
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
