const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({

    username: {
        required: true,
        type: String
    },
    phonenumber: {
        required: true,
        type: String
    },
    content: {
        required: true,
        type: String
    },
    date: {
        type: Date, 
        required: true, 
    },
    message: {
        type: String
    },
    status: {
        type: Boolean
    }
})

const requests = mongoose.model("request", requestSchema)

module.exports = requests
