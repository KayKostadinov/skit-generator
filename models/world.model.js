const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const worldSchema = new Schema({
    world: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2
    }
}, {
    timestamps: false,
});

const World = mongoose.model('World', worldSchema);

module.exports = World;