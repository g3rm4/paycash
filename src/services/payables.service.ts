require('dotenv').config()
import {Payable} from '../database/models/payables'
import {Itransaction, Ipayable} from '../interfaces'
import {sequelize} from '../database/sequelize'

export class PayableService {
    public createPayable(transaction: Itransaction) {
        const payStatus = this.getStatus(transaction.payment_method)

        const fee = this.getPayableFee(transaction.payment_method, transaction.value)

        let payable: Ipayable = {
            transaction_id: transaction.id,
            date: payStatus.payment_date,
            status: payStatus.status,
            transaction_fee: fee,
            transaction_value: transaction.value,
            seller_id: transaction.seller_id,
            transaction_liquid_value: transaction.value - fee,
        }
        return Payable.create(payable)  
    }

    public listPayable(seller_id: number) {
        return Payable.findAll({
            where: {seller_id: seller_id},
            attributes: ['status', [sequelize.fn('sum', sequelize.col('transaction_liquid_value')), 'total']],
            group : ['status'],
            raw: true,
            order: sequelize.literal('total DESC')
        })
    }

    private getStatus(paymentMethod: string) {
        if (paymentMethod == 'debit_card') {
            return {
                status: "paid",
                payment_date: new Date()
            }
        }
        if (paymentMethod == 'credit_card') {
            return {
                status: "waiting_funds",
                payment_date: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000))
            }
        }
    }

    private getPayableFee(paymentMethod: string, transactionValue: number) {
        if (paymentMethod == 'debit_card') {
            let fee = transactionValue * 0.03
            return fee
        }
        if (paymentMethod == 'credit_card') {
            let fee = transactionValue * 0.05
            return fee
        }
    }
}