import {User} from './models/users'
import {Transaction} from './models/transactions'
import {Payable} from './models/payables'

const syncTables = () => {
    User.sync()
    Transaction.sync()
    Payable.sync()
}

export default syncTables