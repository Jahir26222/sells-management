import express from 'express';
import {addSale, getMonthlySale, getTodaySale, getTotalRevenue, getWeeklySale, removeSale} from '../controllers/sale.controller.js';
const router = express.Router();



router.post("/add", addSale);
router.get("/revenue", getTotalRevenue);
router.get("/today", getTodaySale);
router.post("/remove", removeSale);
router.get('/weekly', getWeeklySale);
router.get('/monthly', getMonthlySale);

export default router;