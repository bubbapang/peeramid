const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User'); 

const ratingSchema = new Schema({
    transcendance: {
        type: Number,
        required: true
    },
    actualization: {
        type: Number,
        required: true
    },
    aesthetics: {
        type: Number,
        required: true
    },
    knowledge: {
        type: Number,
        required: true
    },
    esteem: {
        type: Number,
        required: true
    },
    love: {
        type: Number,
        required: true
    },
    safety: {
        type: Number,
        required: true
    },
    physiological: {
        type: Number,
        required: true
    },
    highlights: {
        type: String,
        optional: true
    },
    lowlights: {
        type: String,
h        optional: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Rating', ratingSchema);
