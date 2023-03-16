const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User'); 
const Rating = require('./Rating')

const suggestionSchema = new Schema({

body: {
    type: String,
    required: true
    },
categoryTag: {
    type: String,
    required: true
    },
likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    optional: true
    }],
dislikes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    optional: true
    }],
pins: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    optional: true
    }],
dayRating: {
    type: Schema.Types.ObjectId,
    ref: "Rating"
},
user: {
    type: Schema.Types.ObjectId,
    ref: "User"
}
});

module.exports = mongoose.model('Suggestion', suggestionSchema)