import express from 'express';
import {
  getCompanyById,
  registerCompany,
  updateCompany,
} from '../controllers/company.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.route('/register-company').post(isAuthenticated, registerCompany);
router.route('/get-company').get(isAuthenticated, registerCompany);
router.route('/get-company/:id').get(isAuthenticated, getCompanyById);
router.route('/update-company/:id').put(isAuthenticated, updateCompany);

export default router;
