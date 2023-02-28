const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

const connectDB = async() => {
    try {
        const connect = await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, () => {
            console.log(`Database connected...`);
        })
    } catch (err) {
        console.log(err);
        process.exit()
    }
}

module.exports = {
    connectDB
}