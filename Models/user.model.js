const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userModel = mongoose.Schema

const userSchema = new userModel({
    number: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

userSchema.methods.generateToken = () => {
    const token = jwt.sign({
        _id: this._id,
        number: this.number
    }, process.env.JWT_SECRET, { expiresIn: '2d'})
}


module.exports.User = mongoose.model('User', userSchema)