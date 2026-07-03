import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import saleRoutes from './routes/sale.route.js';
import calculatorRoutes from './routes/calculator.route.js';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors({
  origin:"https://sells-management.onrender.com",
  credentials:true,
}));

app.get('/health', (req, res) => {
  res.send('API is running...');
});

setInterval(() => {
   fetch('https://sells-management.onrender.com/health')
    .then(response => {
      if (!response.ok) {
        throw new Error('Health check failed');
      }
      console.log('Health check successful');
    })
    .catch(error => {
      console.error('Health check error:', error);
    });
}, 5 * 60 * 1000);



app.use('/api/sale', saleRoutes);
app.use('/api/calculate', calculatorRoutes);   
app.use(express.static(path.join(__dirname, "public")));



app.get("*name", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

export default app;