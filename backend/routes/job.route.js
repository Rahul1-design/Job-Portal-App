import express from 'express';
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
} from '../controllers/job.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

export const router = express.Router();

router.route('/post').post(isAuthenticated, postJob);
router.route('/get').post(isAuthenticated, getAllJobs);
router.route('/getadminjobs').post(isAuthenticated, getAdminJobs);
router.route('/get/:id').post(isAuthenticated, getJobById);
