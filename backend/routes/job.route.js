import express from 'express';
import {
  deleteJob,
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
} from '../controllers/job.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.route('/post').post(isAuthenticated, postJob);
router.route('/get').get(getAllJobs);
router.route('/getadminjobs').get(isAuthenticated, getAdminJobs);
router.route('/get/:id').get(getJobById);
router.route('/delete/:id').get(isAuthenticated, deleteJob);

export default router;
