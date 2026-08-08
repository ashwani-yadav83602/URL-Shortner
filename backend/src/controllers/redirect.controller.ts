import { Request, Response, NextFunction } from 'express';
import urlService from '../services/url.service.js';

export async function redirect(req: Request, res: Response, next: NextFunction) {
  try {
    const { shortCode } = req.params;
    const code = Array.isArray(shortCode) ? shortCode[0] : shortCode;
    const doc = await urlService.getByShortCodeAndIncrement(code as string);
    if (!doc) {
      res.status(404).json({ error: { message: 'Short URL not found' } });
      return;
    }
    // Use 302 temporary redirect to allow analytics and future changes
    res.redirect(302, doc.originalUrl);
  } catch (err) {
    next(err);
  }
}

export default { redirect };
