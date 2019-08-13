import express = require('express');
import { PayableService } from '../services/payables.service'
import {authMid} from '../middlewares/auth.middleware'

const payableRoutes = express.Router()
const payable = new PayableService()


payableRoutes.get('/:sellerId', authMid(), async (req, res, next) => {
    payable.listPayable(req.params.sellerId)
    .then((payables) => res.status(200).json(payables))
    .catch(() => res.status(500).json({message:`Oops, there is some errors here. Come back again later.`}))
})

export default payableRoutes