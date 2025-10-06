import express from 'express';
import Menu from '../models/Menu.js';
import { authMiddleware } from '../utils/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { name } = req.query;
  if (name) {
    const menu = await Menu.findOne({ name });
    return res.json(menu || null);
  }
  const menus = await Menu.find({}).sort({ name: 1 });
  res.json(menus);
});

router.post('/', authMiddleware, async (req, res) => {
  const menu = await Menu.create(req.body);
  res.status(201).json(menu);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(menu);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  await Menu.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;