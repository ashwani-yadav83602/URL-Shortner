import { Request, Response, NextFunction } from 'express';
import summaryService from '../services/summary.service.js';

export async function generate(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const sid = Array.isArray(id) ? id[0] : id;
    const summary = await summaryService.generateSummary(sid as string);
    res.status(200).json({ data: { summary } });
  } catch (err) {
    next(err);
  }
}

export default { generate };
