import express from 'express';
import isAutheticated from '../middlewares/isAuthenticated.js';
import {
  applyjob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from '../controllers/application.controller.js';

const router = express.Router();

router.route('/apply/:id').post(isAutheticated, applyjob);
router.route('/get').get(isAutheticated, getAppliedJobs);
router.route('/:id/applicants').get(isAutheticated, getApplicants);
router.route('/status/:id/update').post(isAutheticated, updateStatus);

export default router;
