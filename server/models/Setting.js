import mongoose from 'mongoose';

const SettingSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: Object, default: {} },
    group: { type: String, default: 'general' },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

SettingSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model('Setting', SettingSchema);