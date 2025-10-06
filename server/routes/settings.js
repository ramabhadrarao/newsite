import express from 'express';
import Setting from '../models/Setting.js';
import { authMiddleware } from '../utils/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { group } = req.query;
  const q = group ? { group } : {};
  const settings = await Setting.find(q).sort({ key: 1 });
  res.json(settings);
});

router.post('/', authMiddleware, async (req, res) => {
  const setting = await Setting.create(req.body);
  res.status(201).json(setting);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const setting = await Setting.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(setting);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  await Setting.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;