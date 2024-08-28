const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

const userModel = mongoose.model('userData',userSchema);

module.exports = userModel;