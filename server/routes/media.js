import express from 'express';
import Media from '../models/Media.js';
import { authMiddleware } from '../utils/auth.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  const media = await Media.find({}).sort({ created_at: -1 });
  res.json(media);
});

router.post('/', authMiddleware, async (req, res) => {
  const item = await Media.create(req.body);
  res.status(201).json(item);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const item = await Media.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  await Media.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;