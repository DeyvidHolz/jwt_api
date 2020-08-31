import express from 'express';
const router = express.Router();

import UserController from '../controllers/user.controller';

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post('/api/users/create', UserController.create);
router.post('/api/auth', UserController.auth);

export default router;