import { Router } from 'express';
import summaryController from '../controllers/summary.controller.js';
const router = Router();
// POST /api/summary/:id -> generate or return existing summary
router.post('/:id', summaryController.generate);
export default router;
