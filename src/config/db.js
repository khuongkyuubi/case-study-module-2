const mongoose = require('mongoose');
require("dotenv").config();


const connectDB = async function()  {
        try {
            await mongoose.connect(process.env.DB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('MongoDB Connection Succeeded.')
        } catch (err) {
            console.log('Error in DB connection : ' + err)
        }
    }
;

module.exports = connectDB;
// require('../models/employee.model');