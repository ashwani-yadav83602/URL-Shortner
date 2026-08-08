import { Router } from 'express';
import urlController from '../controllers/url.controller.js';
const router = Router();
// Primary endpoint
router.post('/shorten', urlController.shorten);
// Convenience alias: allow POST /api/url for existing Postman requests
router.post('/', urlController.shorten);
export default router;
