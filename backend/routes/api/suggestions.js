const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { requireUser } = require('../../config/passport');
const User = mongoose.model('User');
const Rating = mongoose.model('Rating');
const Suggestion = mongoose.model('Suggestion')


router.delete("/:id", requireUser, async(req, res, next) => {
    const currentUser = req.user;
    const suggestionId = req.params.id

    try {
        const suggestion = await Suggestion.findById(suggestionId)
        if (suggestion.user.toString() !== currentUser._id.toString()) {
            return res.status(404).json({message: 'Not Authorized'})
        }
        if (!suggestion) {
            return res.status(404).json({ message: 'Suggestion not found' })
        }
        await Suggestion.findByIdAndDelete(suggestionId)
        return res.status(200).json({ message: 'Suggestion deleted' });
    } catch(err) {
        next(err)
    }    
});

router.get("/:categoryTag", async (req, res, next) => {
    try {
        const suggestions = await Suggestion.find({categoryTag: req.params.categoryTag });
//ONLY RETURN SUGGESTIONS IF BOTH POSTER AND COMMENTER ARE BOTH PUBLIC
//FIX THIS TOMORROW
        if (!suggestions) {
            return res.status(404).json({message: 'Suggestion not found'});
        }
        return res.json(suggestions);

    } catch(err) {
        next(err)
    }
})



module.exports = router