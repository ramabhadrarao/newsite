import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import authRoutes from './routes/auth.js';
import pageRoutes from './routes/pages.js';
import menuRoutes from './routes/menus.js';
import menuItemRoutes from './routes/menuItems.js';
import sectionRoutes from './routes/sections.js';
import settingRoutes from './routes/settings.js';
import mediaRoutes from './routes/media.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

connectDB();

app.get('/', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/menu-items', menuItemRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/media', mediaRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});