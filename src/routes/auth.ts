import express from 'express';
const router = express.Router();

import AuthMiddleware from '../middlewares/auth.middleware';

router.get('/welcome', AuthMiddleware, (req, res) => {
  res.send('Hello World!');
});

export default router;