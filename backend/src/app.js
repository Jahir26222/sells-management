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

// CORS me humesha FRONTEND ka deployed URL aata hai
app.use(cors({
  origin: "https://sells-management.onrender.com", // Make sure yeh aapke Frontend ka link hai
  credentials: true,
}));

app.get('/health', (req, res) => {
  res.send('API is running...');
});

// Render Application ko active rakhne ke liye self-ping interval
setInterval(() => {
   fetch('https://sells-management.onrender.com/health') // Agar backend URL alg hai toh backend ka link dalein
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

// API Routes
app.use('/api/sale', saleRoutes);
app.use('/api/calculate', calculatorRoutes);  
 
// Static files serve karna (React build/public folder)
app.use(express.static(path.join(__dirname, "public")));

// FIX: "*name" ko badal kar sirf "*" kiya taaki saare frontend routes handle ho sakein
app.get("*name", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

export default app;