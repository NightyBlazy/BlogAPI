const mongoose = require('mongoose')
require('dotenv').config();


const mongoString = process.env.DB_URL

const connectDB = async () => {
    try {
        await mongoose.connect(mongoString, {
            useUnifiedTopology : true,
            useNewUrlParser : true
        });
        
    }
    catch (err){
        console.error(err);
    }
}


module.exports = connectDB;