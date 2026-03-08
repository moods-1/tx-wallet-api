import express from 'express';
import dotenv from 'dotenv';
import { initDB } from './config/db.js';
import ratelimiter from './middleware/rateLimiter.js';
import cors from 'cors';
import job from './config/cron.js';

import transactionsRoute from './routes/transactionsRoute.js';

dotenv.config();
const app = express();
if (process.env.NODE_ENV === 'production') job.start();

const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({ origin: 'http://localhost:8081' }));
app.use(ratelimiter);
app.use(express.json());


app.get('/api/health', (req, res) => {
	res.status(200).json({ status: "ok" });
});

app.use('/api/transactions', transactionsRoute);

// Only start the server if the DB initializes
initDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Server running on PORT:${PORT}`);
	});
});
