require('dotenv').config()
const server = require('./index')

const port = process.env.SERVER_PORT

server.listen(port, () => console.log(`listening on port ${port}`))