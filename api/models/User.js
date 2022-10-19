const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String,
        trim: true,
        required: true,
        index: true
    },
    lastname: {
        type: String,
        trim: true,
        required: true,
        index: true
    },
    entries: {
        type: Number,
        required: true,
        default: 10
    },
    lastEntry: {
        type: Date,
        required: false
    },
    gender: {
        type: String,
        trim: true,
        required: true,
        default: 'M',
        uppercase: true,
        enum: ['M', 'F']
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    collection: 'users'
});

module.exports = mongoose.model('User', UserSchema);
