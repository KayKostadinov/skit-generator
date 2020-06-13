const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const characterSchema = new Schema({
    character: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2
    }
}, {
    timestamps: false,
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;