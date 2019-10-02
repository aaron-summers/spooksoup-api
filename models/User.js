const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 2
    },
    email: {
        type: String, 
        required: true,
        max: 254,
        min: 6
    },
    password: {
        type: String, 
        required: true,
        min: 6
    }
})

module.exports = mongoose.model('user', userSchema);