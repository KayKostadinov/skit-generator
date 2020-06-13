const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const occupationSchema = new Schema({
    occupation: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2
    }
}, {
    timestamps: false,
});

const Occupation = mongoose.model('Occupation', occupationSchema);

module.exports = Occupation;