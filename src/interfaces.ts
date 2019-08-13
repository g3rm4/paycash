export interface IloginObject {
    name: string,
    username: string,
    id: number,
    token: string
}

export interface Itransaction {
    id?: number,
    value: number,
    description: string,
    payment_method: string,
    card_numbers: number,
    card_owner_name: string,
    card_expiration: string,
    cvv: number,
    seller_id: number 
}

export interface Ipayable {
    id?: number,
    transaction_id: number,
    date: Date,
    status: string,
    transaction_fee: number,
    transaction_value: number,
    seller_id: number,
    transaction_liquid_value: number,
}