const mongoose = require('mongoose')

const complaintSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    phonenumber: {
        required: true,
        type: String
    },
    complaint: {
        required: true,
        type: String
    }
})

const complaints = mongoose.model("complaints", complaintSchema)

module.exports = complaints