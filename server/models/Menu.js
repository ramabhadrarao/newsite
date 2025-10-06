import mongoose from 'mongoose';

const MenuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    location: { type: String, default: 'header' },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

MenuSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model('Menu', MenuSchema);