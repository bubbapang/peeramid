const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Rating = mongoose.model('Rating');
const User = mongoose.model('User');
const Suggestion = mongoose.model('Suggestion')
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

router.get('/public', async (req, res, next ) => {
    const publicUsers = await User.find({public: true }, '_id ');
    const publicUserIds = publicUsers.map((user) => user._id )
    try {
        const ratings = await Rating.find({ user: { $in: publicUserIds }})
                                    .populate("user", "_id")
        if (!ratings) {
            return res.status(404).json({message: 'Rating not found'});
        }
        return res.json(ratings);

    } catch(err) {
        next(err)
    }
});

router.get('/following', requireUser, async(req, res, next) => {
    const currentUser = req.user;
    const followingUserIds = currentUser.following
    try {
        const ratings = await Rating.find({ user: { $in: followingUserIds}})
                                    .populate("user", "_id")
        if (!ratings) {
            return res.status(404).json({message: 'Rating not found'})
        }
        return res.json(ratings);
    } catch(err) {
        next(err)
    }
});

router.delete('/:id', requireUser, async(req, res, next) => {
    const currentUser = req.user;
    const ratingId = req.params.id
    try {
        const rating = await Rating.findById(ratingId)
        if (rating.user.toString() !== currentUser._id.toString()) {
            return res.status(404).json({message: 'Not Authorized'})
        }
        if (!rating) {
            return res.status(404).json({ message: 'Rating not found' })
        }
        await Rating.findByIdAndDelete(ratingId)
        return res.status(200).json({ message: 'Rating deleted' });
    } catch(err) {
        next(err)
    }    
});

router.post("/:id/suggestions", requireUser, async (req, res, next) => {
    try {
        const newSuggestion = new Suggestion( {
            ...req.body,
            dayRating: req.params.id,
            user: req.user._id
        });
        let suggestion = await newSuggestion.save();
        if (!suggestion) {
            return res.status(404).json({message: `Suggestion not created`});
        }
        suggestion = await Suggestion.populate(
            suggestion, [
            { path: 'dayRating', select: '_id' },
            { path: 'user', select: '_id username' },
            ])
        return res.json(suggestion);
    } catch(err) {
        next(err);
    }
});

router.get("/:id/suggestions", async (req, res, next) => {
    try {
        const suggestions = await Suggestion.find({dayRating: req.params.id });

        if (!suggestions) {
            return res.status(404).json({message: 'Suggestion not found'});
        }
        return res.json(suggestions);

    }
    catch(err) {
        next(err)
    }
});


function isSameDay(timestamp) {
    const date1 = new Date(timestamp);
    const date2 = new Date();
    return  date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
}


router.put('/:id', requireUser, async (req, res, next) => {
    const currentUser = req.user;
    const ratingId = req.params.id;
    const updatedData = req.body;

    try {
        const rating = await Rating.findById(ratingId);

        if (!rating) {
            return res.status(404).json({ message: 'Rating not found' });
        }

        if (rating.user.toString() !== currentUser._id.toString()) {
            return res.status(403).json({ message: 'Not Authorized' });
        }

        if (!isSameDay(rating.createdAt)) {
            return res.status(403).json({ message: 'Cannot edit - Too much time passed' });
        }

        Object.assign(rating, updatedData);

        await rating.save();
        return res.status(200).json(rating);
    } catch (err) {
        next(err);
    }
});

module.exports = router