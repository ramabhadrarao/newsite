import express from 'express';
import MenuItem from '../models/MenuItem.js';
import { authMiddleware } from '../utils/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { menu_id, parent_id } = req.query;
  const q = {};
  if (menu_id) q.menu_id = menu_id;
  if (parent_id === 'null') q.parent_id = null;
  else if (parent_id) q.parent_id = parent_id;
  const items = await MenuItem.find(q).sort({ sort_order: 1 });
  res.json(items);
});

router.post('/', authMiddleware, async (req, res) => {
  const item = await MenuItem.create(req.body);
  res.status(201).json(item);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;