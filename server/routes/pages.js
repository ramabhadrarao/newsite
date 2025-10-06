import express from 'express';
import Page from '../models/Page.js';
import { authMiddleware } from '../utils/auth.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  const pages = await Page.find({}).sort({ created_at: -1 });
  res.json(pages);
});

router.get('/slug/:slug', async (req, res) => {
  const page = await Page.findOne({ slug: req.params.slug, status: 'published' });
  res.json(page || null);
});

router.get('/:id', async (req, res) => {
  const page = await Page.findById(req.params.id);
  res.json(page || null);
});

router.post('/', authMiddleware, async (req, res) => {
  const body = req.body || {};
  const page = await Page.create({ ...body, created_by: req.user?.id });
  res.status(201).json(page);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const page = await Page.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(page);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  await Page.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;