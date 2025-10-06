import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema(
  {
    menu_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
    label: { type: String, required: true },
    url: { type: String },
    page_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' },
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', default: null },
    sort_order: { type: Number, default: 0 },
    icon: { type: String },
    target: { type: String, default: '_self' },
    css_class: { type: String },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

MenuItemSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model('MenuItem', MenuItemSchema);