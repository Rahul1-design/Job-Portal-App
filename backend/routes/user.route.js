import express from 'express';
import {
  login,
  register,
  updateProfile,
} from '../controllers/user.controller.js';
import isAuthticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/profile/update').post(isAuthticated, updateProfile);

export default router;
