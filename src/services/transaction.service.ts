import {Transaction} from '../database/models/transactions'
import {Itransaction} from '../interfaces'

export class TransactionService {
    public createTransaction(transaction: Itransaction) {
        return Transaction.create({
            value: transaction.value,
            description: transaction.description,
            payment_method: transaction.payment_method,
            last_four_card_numbers: transaction.card_numbers.toString().slice(-4),
            card_owner_name: transaction.card_owner_name,
            card_expiration: transaction.card_expiration,
            cvv: transaction.cvv,
            seller_id: transaction.seller_id 
        })
    }

    public listTransactions(sellerId: number) {
        return Transaction.findAll({where:{seller_id: sellerId}})
    }
}