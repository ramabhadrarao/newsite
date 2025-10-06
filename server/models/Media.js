import mongoose from 'mongoose';

const MediaSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    path: { type: String, required: true },
    mime_type: { type: String, required: true },
    size: { type: Number, default: 0 },
    alt_text: { type: String },
    caption: { type: String },
    uploaded_by: { type: String },
  },
  { timestamps: { createdAt: 'created_at' } }
);

MediaSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model('Media', MediaSchema);