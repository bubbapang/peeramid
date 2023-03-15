const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Rating = mongoose.model('Rating')
const passport = require('passport');
const Suggestion = mongoose.model('Suggestion');
const { loginUser, restoreUser, requireUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    message: "GET /api/users"
  });
});

router.get('/current', restoreUser, (req, res) => {
  if (!isProduction) {
    // In development, allow React server to gain access to the CSRF token
    // whenever the current user information is first loaded into the
    // React application
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    // username: req.user.username,
    email: req.user.email
  });
});

router.post('/register', validateRegisterInput ,async (req, res, next) => {
  // Check to make sure no one has already registered with the proposed email or
  // username.
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  });

  if (user) {
    // Throw a 400 error if the email address and/or email already exists
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username === req.body.username) {
      errors.username = "A user has already registered with this username";
    }
    if (user.firstName === req.body.firstName) {
      errors.firstName = "firstName must be between 2 and 30 characters";
    }
    if (user.lastName === req.body.lastName) {
      errors.lastName = "lastName must be between 2 and 30 characters";
    }
    
    err.errors = errors;
    return next(err);
  }

  // Otherwise create a new user
  const newUser = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    public: req.body.public,
    following: req.body.following,
    followers: req.body.followers,
    followRequest: req.body.followRequest
    
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user));
      }
      catch(err) {
        next(err);
      }
    })
  });
});

router.post('/login', validateLoginInput, async (req, res, next) => {
  passport.authenticate('local', async function(err, user) {
    

    if (err) return next(err);
    console.log(err)
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});

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
    if (currentUser.followRequest.includes(req.params.id)) {
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

router.post('/approve/:id', restoreUser, async(req, res, next) => {
  const requesterUser = await User.findById(req.params.id) //user who sent request
  const currentUser = req.user; //user approving request
  
  try {
    if (!requesterUser) {
      return res.status(404).json({message:'User not found' })
    }
    if (!currentUser) {
      return res.status(404).json({message: 'Current user not found'})
    }
    if (!currentUser.followRequest.includes(requesterUser._id)) {
      return res.status(400).json({message: `No request to approve`})
    }
    // currentUser is approving
    await User.findByIdAndUpdate(currentUser._id, {
      $push: { followers: requesterUser._id },
      $pull: { followRequest: requesterUser._id}
    });
    
    // requesterUser is requesting to follow
    await User.findByIdAndUpdate(requesterUser._id, {
      $push: { following: currentUser._id }
    })
    return res.status(200).json({message: 'Follow request approved'})
  } catch (err) {
    return next(err)
  }
  
})

router.delete('/delete/:id', restoreUser, async(req, res, next) => {
    const requesterUser= await User.findById(req.params.id);
    const currentUser = req.user;
    try {
      if (!requesterUser) {
        return res.status(404).json({message:'User not found' })
      }
      if (!currentUser) {
        return res.status(404).json({message: 'Current user not found'})
      }
      if (!currentUser.followRequest.includes(requesterUser._id)) {
        return res.status(400).json({message: `No request to approve`})
      }
      // currentUser is approving
      await User.findByIdAndUpdate(currentUser._id, {
        $pull: { followRequest: requesterUser._id}
      });
      
      return res.status(200).json({message: 'Follow request deleted'})
    } catch (err) {
      return next(err)
    }
});

router.get('/:id/ratings', async(req, res, next) => {
  const visitedUser = await User.findById(req.params.id);

  try {
      const ratings = await Rating.find({ user: visitedUser._id})
                                  .populate("user", "_id")
      if (!ratings) {
          return res.status(404).json({message: 'Rating not found'})
      }
      return res.json(ratings);
  } catch(err) {
      next(err)
  }
});

router.get("/:id/suggestions", requireUser, async (req, res, next) => {
  try {
      const suggestions = await Suggestion.find({user: req.params.id });

      if (!suggestions) {
          return res.status(404).json({message: 'Suggestion not found'});
      }
      return res.json(suggestions);

  } catch(err) {
      next(err)
  }
});

module.exports = router;
