const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String,
        trim: true,
        required: [true, 'a value is required'],
        index: true
    },
    lastname: {
        type: String,
        trim: true,
        required: [true, 'a value is required'],
        index: true
    },
    entries: {
        type: Number,
        required: [true, 'a value greater than 0 is required'],
        validate: [(val) => val > 0, 'a value greater than 0 is required'],
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
