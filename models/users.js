const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username must be provided'],
        minlength: 2,
        maxlength: 32,
        unique: true,
    },
    hashed_password: {
        type: String,
        required: [true, 'Password must be provided'],
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', UserSchema);

UserSchema.virtual('password')
    .get(function() {
        return 'password';
    });

module.exports = {User};