require('dotenv').config()

const express = require('express')

const cors = require('cors')

const router = require('./router')

const HServer = express()

HServer.use(cors())

HServer.use(express.json())

HServer.use(router)

require('./connection')

const PORT = 4000 || process.env.PORT

HServer.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
})

HServer.get('/', () => {
    console.log(`get request received`);

})