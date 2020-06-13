const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema({
    location: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2
    }
}, {
    timestamps: false,
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;