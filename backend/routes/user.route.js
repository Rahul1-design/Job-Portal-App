import express from 'express';
import {
  getCurrentUser,
  login,
  logout,
  register,
  updateProfile,
} from '../controllers/user.controller.js';
import isAuthticated from '../middlewares/isAuthenticated.js';
import { singleUpload } from '../middlewares/multer.js';

const router = express.Router();

router.route('/register').post(singleUpload, register);
router.route('/login').post(singleUpload, login);
router.route('/logout').get(logout);
router
  .route('/profile/update')
  .post(isAuthticated, singleUpload, updateProfile);
router.route('/get').get(isAuthticated, getCurrentUser);
export default router;
