const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const desireSchema = new Schema({
    desire: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2
    }
}, {
    timestamps: false,
});

const Desire = mongoose.model('Desire', desireSchema);

module.exports = Desire;