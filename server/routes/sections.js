import express from 'express';
import Section from '../models/Section.js';
import { authMiddleware } from '../utils/auth.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  const sections = await Section.find({}).populate('page_id', 'title slug').sort({ created_at: -1 });
  res.json(sections);
});

router.get('/by-page/:pageId', async (req, res) => {
  const items = await Section.find({ page_id: req.params.pageId, is_active: true }).sort({ sort_order: 1 });
  res.json(items);
});

router.post('/', authMiddleware, async (req, res) => {
  const section = await Section.create(req.body);
  res.status(201).json(section);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const section = await Section.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(section);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  await Section.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;