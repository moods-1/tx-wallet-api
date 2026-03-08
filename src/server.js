import express from 'express';
import dotenv from 'dotenv';
import { initDB } from './config/db.js';
import ratelimiter from './middleware/rateLimiter.js';
import cors from 'cors';

import transactionsRoute from './routes/transactionsRoute.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({ origin: 'http://localhost:8081' }));
app.use(ratelimiter);
app.use(express.json());


app.get('/health', (req, res) => {
	res.send("It's working");
});

app.use('/api/transactions', transactionsRoute);

// Only start the server if the DB initializes
initDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Server running on PORT:${PORT}`);
	});
});
