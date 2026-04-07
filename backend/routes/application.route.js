import express from 'express';
import isAutheticated from '../middlewares/isAuthenticated.js';
import {
  applyjob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from '../controllers/application.controller.js';

const router = express.Router();

router.use('/apply/:id').get(isAutheticated, applyjob);
router.use('/get').get(isAutheticated, getAppliedJobs);
router.use('/:id/applicants').get(isAutheticated, getApplicants);
router.use('/status/:id/update').post(isAutheticated, updateStatus);

export default router;
