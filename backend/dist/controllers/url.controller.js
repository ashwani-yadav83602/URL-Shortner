import urlService from '../services/url.service.js';
export async function shorten(req, res, next) {
    try {
        const { url } = req.body;
        const doc = await urlService.shortenUrl(url);
        res.status(201).json({
            id: doc._id || doc.id,
            originalUrl: doc.originalUrl,
            shortUrl: doc.shortUrl,
            shortCode: doc.shortCode,
            summary: doc.summary,
            clicks: doc.clicks,
            createdAt: doc.createdAt,
        });
    }
    catch (err) {
        next(err);
    }
}
export default { shorten };
