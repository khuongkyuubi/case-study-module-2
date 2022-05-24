const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    fullName: {
        type: String,
        required: 'Required this field.'
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    city: {
        type: String
    }
});

// Custom validation for email
employeeSchema.path('email').validate((value) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(value);
}, 'Invalid e-mail. please try again');

employeeSchema.path('mobile').validate((value) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(value);
}, 'Invalid mobile. please try again');

const employeeModel = mongoose.model('Employee', employeeSchema);

module.exports = employeeModel; // is a class