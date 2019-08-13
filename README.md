###API
para iniciar a aplicação, basta rodar o comando:
`$ npm start`

A aplicação utiliza o pacote npx que já está incluso em versões a partir da 5.2.x do NPM. Se você não tem esse binário, é necessário instalar:
`$ npm i -g npx`

###BANCO DE DADOS
O banco de dados está dockerizado. Para executá-lo basta entrar na pasta 'db':
`$ cd db`
`$ docker-compose -f postgresdb.yml up`


###ENDPOINTS
A aplicação está dividida em 3 partes:

####Users

#####POST
- Sem autenticação
- cria um novo "seller", o vendedor que irá receber os "payables".
- Exemplo de body:
{
    "name": "Juca",
    "username":"juca",
    "password":"juca123"   
}

#####GET
- Necessário enviar username e senha como Basic Auth
- Faz login no usuário enviado. Retorna um token de autenticação que será necessário nas outras chamadas


####Transactions

#####POST
- Necessário enviar o token recebido em /users no Header da solicitação como key:value
`x-access-token:TOKEN_VALUE`
- cria uma nova transaction e atualiza os payables. É necessário enviar o seller_id no body, ou seja,o vendedor que receberá os payables daquela transação
- Exemplo de body:
{ 
	"value": 372.00,
    "description": "novo produto xyz",
    "payment_method": "debit_card",
    "card_numbers": 9999999999,
    "card_owner_name": "Seu Juca",
    "card_expiration": "08/22",
    "cvv": 555,
    "seller_id": 5
}

#####GET
- Necessário enviar o token recebido em /users no Header da solicitação como key:value
`x-access-token:TOKEN_VALUE`
- Retorna todas as transações de um determinado seller. Necessário enviar o id do seller
- exemplo de chamada (onde 3 seria o id do vendedor solicitado):
SERVER:PORT/transactions/3


####Payables

#####GET
- Necessário enviar o token recebido em /users no Header da solicitação como key:value
`x-access-token:TOKEN_VALUE`
- Retorna todas os payables de um determinado seller. Necessário enviar o id do seller
- exemplo de chamada (onde 3 seria o id do vendedor solicitado):
SERVER:PORT/payables/3