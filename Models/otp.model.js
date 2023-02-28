const mongoose = require('mongoose')

const otpModel = mongoose.Schema

const otpSchema = new otpModel({
    number: {
        type: String,
        required: true
    },

    otp: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        index: {
            expires: '2m'
        },
    },
}, {
    timestamps: true
})


module.exports.Otp = mongoose.model('Otp', otpSchema)