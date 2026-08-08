import { UrlModel } from '../models/index.js';
import generateShortCode from '../utils/shortid.js';
import validateAndNormalizeUrl from '../utils/validateUrl.js';
import config from '../config/index.js';

const MAX_RETRIES = 5;

export async function shortenUrl(original: string) {
  const normalized = validateAndNormalizeUrl(original);

  // Check for existing
  const existing = await UrlModel.findOne({ originalUrl: normalized }).exec();
  if (existing) {
    return existing;
  }

  // Create with retry on shortCode collision
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const shortCode = generateShortCode(6);
    const base = process.env.BASE_URL || `http://localhost:${config.PORT}`;
    const shortUrl = `${base.replace(/\/$/, '')}/${shortCode}`;
    try {
      const doc = await UrlModel.create({
        originalUrl: normalized,
        shortCode,
        shortUrl,
      });
      return doc;
    } catch (err: any) {
      // Duplicate key on shortCode - retry
      if (err?.code === 11000) {
        continue;
      }
      throw err;
    }
  }
  throw new Error('Failed to generate unique short code');
}

export async function getByShortCodeAndIncrement(shortCode: string) {
  // Atomically find and increment clicks
  const doc = await UrlModel.findOneAndUpdate(
    { shortCode },
    { $inc: { clicks: 1 } },
    { new: true }
  ).exec();
  return doc;
}

const urlService = { shortenUrl, getByShortCodeAndIncrement };
export default urlService;
