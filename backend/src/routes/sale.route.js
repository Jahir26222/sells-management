import express from 'express';
import {addSale, getTodaySale, getTotalRevenue, removeSale} from '../controllers/sale.controller.js';
const router = express.Router();



router.post("/add", addSale);
router.get("/revenue", getTotalRevenue);
router.get("/today", getTodaySale);
router.post("/remove", removeSale);

export default router;