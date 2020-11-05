const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    sex: {type: String, required: true},
    email: {type: String, required: true, unique: true}, //two users can't have the same email
    password: {type: String, required: true},
});

userSchema.plugin(uniqueValidator); //avoid error about duplicate email

module.exports = mongoose.model('User', userSchema);
