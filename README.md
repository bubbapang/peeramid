# [Peeramid](https://peeramid.onrender.com)

## Description
Peeramid is a self-improvement app based on the principles of Maslow's extended Hierarchy of Needs. Users can create a daily rating for each level of the hierarchy, leave suggestions for improvement on other peoples' ratings, and like/pin suggestions that they like. Users will have the option of setting their profile to private, meaning that only friends can see their ratings, or public, meaning that everyone can see their ratings.

## Tech Stack
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
 ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

## User Flow

### Making a rating
#### User can make daily ratings and rate each need on a scale from 1 to 10. They can even add highlight and lowlight of the day if they wish to.
![Mar-23-2023 11-26-32](https://user-images.githubusercontent.com/71748091/227356751-ccc589a9-75c7-4486-b5bc-26bf69f58c8e.gif)

### Making a suggestion
#### User can browse their ratings feed and suggest ideas to their friends on improving the need they are struggling on.
![suggestion](https://user-images.githubusercontent.com/71748091/227364580-c10c9aac-9c13-4edd-8f0f-ab81bc6558a0.gif)

## Significant Code
### User Follow
This code lets users follow each other on the app. It checks if the users are valid and if they haven't already followed each other before adding them to each other's lists. If the account is private, it sends a follow request instead. The code then responds to the user to confirm that the follow action was successful.

```JavaScript
router.post('/:id/follow', restoreUser, async (req, res, next) => {
  const targetUser = await User.findById(req.params.id)
  const currentUser = req.user;

  try {
    if (!targetUser) {
      return res.status(404).json({message: 'User not found'});
    }
    if (!currentUser) {
      return res.status(404).json({message: 'Current user not found'})
    }
    if (currentUser._id === targetUser._id) {
      return res.status(404).json({message: 'Cannot follow self'})
    }
    if (currentUser.following.includes(req.params.id)) {
      return res.status(400).json({message: `Already following this user`});
    }
    if (targetUser.followRequest.includes(currentUser._id)) {
      return res.status(400).json({message: `Already sent follow request`});
    }
    if (targetUser.public) {
      await User.findOneAndUpdate(
        { _id: currentUser._id },
        { $push: {following: targetUser._id }}
      );
      await User.findOneAndUpdate(
        { _id: targetUser._id },
        { $push: {followers: currentUser._id }}
      );
       return res.status(200).json({message: 'User followed successfully'}); // Add this line;
    } else {
      await User.findOneAndUpdate(
        { _id: targetUser._id },
        { $push: {followRequest: currentUser._id }}
      );
       return res.status(200).json({message: 'Follow request sent'}); // Add this line
    }
  } catch (err) {
    return next(err)
  }
});
```
### Update Ratings

This is the code to update the ratings and only lets the user update it if its the same day
``` Javascript
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
```

## Vision
We aim to implement these features in the future to enhance user experience:
+ Profile pictures: Add the ability for users to upload profile pictures.
+ Public/Private accounts: Give users the option to set their accounts to public or private.
+ Gamification: Implementing a gamification element in the app to incentivize users to stay motivated in their self-improvement journey. This could include a points system, rewards, and badges.
+ Email reminders:  Add email reminders for users to make their daily rating, so they can stay on track with their self-improvement goals.

