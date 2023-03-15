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
likes: {
    type: Number,
    optional: true
    },
dislikes: {
    type: Number,
    optional: true
    },
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