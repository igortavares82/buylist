var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {

    return {
        name: String,
        birth: Date,
        email: String,
        isActive: Boolean,
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    }
}