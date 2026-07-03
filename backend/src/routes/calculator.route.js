import express from 'express';
const router = express.Router();

import { calculateParcel } from '../controllers/calculator.controller.js';

router.post("/", calculateParcel);
export default router;