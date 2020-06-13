const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const themeSchema = new Schema({
    theme: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2
    }
}, {
    timestamps: false,
});

const Theme = mongoose.model('Theme', themeSchema);

module.exports = Theme;