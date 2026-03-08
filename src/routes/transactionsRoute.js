import express from 'express';

import {
	addTransaction,
	deleteTransactionById,
	getAccountSummary,
	getTransactionsByUserId,
} from '../controllers/transactionsController.js';

const router = express.Router();

router.get('/', getTransactionsByUserId);

router.get('/summary', getAccountSummary);

router.delete('/', deleteTransactionById);

router.post('/', addTransaction);

export default router;
