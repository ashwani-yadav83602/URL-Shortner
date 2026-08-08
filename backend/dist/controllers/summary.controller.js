import summaryService from '../services/summary.service.js';
export async function generate(req, res, next) {
    try {
        const { id } = req.params;
        const sid = Array.isArray(id) ? id[0] : id;
        const summary = await summaryService.generateSummary(sid);
        res.status(200).json({ data: { summary } });
    }
    catch (err) {
        next(err);
    }
}
export default { generate };
