import mongoose, { Document, Schema } from 'mongoose';

export interface IUrl extends Document {
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clicks: number;
  summary?: any;
  title?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UrlSchema = new Schema<IUrl>(
  {
    originalUrl: { type: String, required: true, trim: true },
    shortCode: { type: String, required: true, unique: true, index: true },
    shortUrl: { type: String, required: true },
    clicks: { type: Number, default: 0 },
    summary: { type: Schema.Types.Mixed, default: undefined },
    title: { type: String, default: '' },
  },
  { timestamps: true }
);

UrlSchema.index({ shortCode: 1 }, { unique: true });

const UrlModel = mongoose.model<IUrl>('Url', UrlSchema);

export default UrlModel;
