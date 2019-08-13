import express = require('express');
import { TransactionService } from '../services/transaction.service';
import { PayableService } from '../services/payables.service'
import {authMid} from '../middlewares/auth.middleware'

const transactionRoutes = express.Router()
const transaction = new TransactionService()
const payable = new PayableService()

transactionRoutes.post('/', authMid(), async (req, res, next) => {
    try {
        const transactionCreated = await transaction.createTransaction(req.body)
        await payable.createPayable(transactionCreated)
        res.status(201).json({message:`Transaction created with id ${transactionCreated.id}`})
    } catch {
        res.status(500).json({message:`Oops, there is some errors here. Come back again later.`})
    }
})

transactionRoutes.get('/:sellerId', authMid(), async (req, res, next) => {
    transaction.listTransactions(req.params.sellerId)
    .then((transactions) => res.status(200).json(transactions))
    .catch(() => res.status(500).json({message:`Oops, there is some errors here. Come back again later.`}))
})

export default transactionRoutes