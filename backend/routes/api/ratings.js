const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Rating = mongoose.model('Rating');
const { requireUser } = require('../../config/passport');

/*
create ratings
edit ratings
delete ratings
get ALL ratings
get followed ratings
get user ratings
*/

router.post('/', requireUser, async (req, res, next) => {
    try {
        const newRating = new Rating( {
            ...req.body,
            user: req.user._id
        });
        let rating = await newRating.save();
        rating = await rating.populate('user', '_id username');
        return res.json(rating);
    }
    catch(err) {
        next(err);
    }
});

router.get('/' , async (req, res ) => {
    try {
        const ratings = await Rating.find()
                                    .populate("user", "_id username")
        return res.json(ratings);

    }
    catch(err) {
        return res.json([]);
    }
});

router.delete()

// router.patch('/', function(req, res, next) {
    
// })

// get all ratings

// router.get('/:follewerId/')

// router.get('/:userId/ratings')

module.exports = router