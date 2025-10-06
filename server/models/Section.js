import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema(
  {
    page_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' },
    name: { type: String, required: true },
    type: { type: String, required: true },
    content: { type: Object, default: {} },
    sort_order: { type: Number, default: 0 },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

SectionSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model('Section', SectionSchema);