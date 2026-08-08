import mongoose, { Schema } from 'mongoose';
const UrlSchema = new Schema({
    originalUrl: { type: String, required: true, trim: true },
    shortCode: { type: String, required: true, unique: true, index: true },
    shortUrl: { type: String, required: true },
    clicks: { type: Number, default: 0 },
    summary: { type: Schema.Types.Mixed, default: undefined },
    title: { type: String, default: '' },
}, { timestamps: true });
UrlSchema.index({ shortCode: 1 }, { unique: true });
const UrlModel = mongoose.model('Url', UrlSchema);
export default UrlModel;
