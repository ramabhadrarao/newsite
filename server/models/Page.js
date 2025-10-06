import mongoose from 'mongoose';

const PageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: Object, default: {} },
    meta_title: { type: String },
    meta_description: { type: String },
    template: { type: String, default: 'default' },
    status: { type: String, default: 'draft', enum: ['published', 'draft', 'archived'] },
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Page', default: null },
    sort_order: { type: Number, default: 0 },
    created_by: { type: String },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

PageSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model('Page', PageSchema);