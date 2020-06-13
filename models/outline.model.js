const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const outlineSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    text: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true,
});

const Outline = mongoose.model('Outline', outlineSchema);

module.exports = Outline;