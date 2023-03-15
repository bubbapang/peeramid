const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Rating = require('../models/Rating')
const Suggestion = require("../models/Suggestion")
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongoose').Types;

const user1Id = new ObjectId();
const user2Id = new ObjectId();
const user3Id = new ObjectId();
const user4Id = new ObjectId();

const rating1Id = new ObjectId();
const rating2Id = new ObjectId();
const rating3Id = new ObjectId();
const rating4Id = new ObjectId();

const suggestion1Id = new ObjectId();
const suggestion2Id = new ObjectId();
const suggestion3Id = new ObjectId();

const users = [];
const ratings = [];
const suggestions = [];

users.push(
  new User ({
    _id: user1Id,
    firstName: 'Madhur',
    lastName: 'Luthra',
    username: 'demo-user',
    email: 'madhur@user.io',
    hashedPassword: bcrypt.hashSync('starwars', 10)
  }),
    new User ({
    _id: user2Id,
    firstName: 'andre',
    lastName: 'hanna',
    username: 'andre01',
    email: 'andre@user.io',
    hashedPassword: bcrypt.hashSync('password', 10)
  }),
  new User ({
    _id: user3Id,
    firstName: 'adam',
    lastName: 'pen',
    username: 'adam01',
    email: 'adam@user.io',
    public: false,
    hashedPassword: bcrypt.hashSync('password', 10)
  }),
  new User ({
    _id: user4Id,
    firstName: 'jasmine',
    lastName: 'kobata',
    username: 'jasmine01',
    email: 'jasmine@user.io',
    hashedPassword: bcrypt.hashSync('password', 10)
  }),
)

ratings.push(
  new Rating ({
    _id: rating1Id,
    transcendance: 5,
    actualization: 6,
    aesthetics: 9,
    knowledge: 2,
    esteem: 4,
    love: 1,
    safety: 3,
    physiological: 4,
    highlights: "great stuff",
    lowlights: "yes sir",
    user: user1Id,
  }),
  new Rating ({
    _id: rating2Id,
    transcendance: 5,
    actualization: 6,
    aesthetics: 9,
    knowledge: 2,
    esteem: 4,
    love: 1,
    safety: 3,
    physiological: 4,
    highlights: "great stuff",
    lowlights: "yes sir",
    user: user2Id
  }),
  new Rating ({
    _id: rating3Id,
    transcendance: 5,
    actualization: 6,
    aesthetics: 9,
    knowledge: 2,
    esteem: 4,
    love: 1,
    safety: 3,
    physiological: 4,
    highlights: "great stuff",
    lowlights: "yes sir",
    user: user3Id
  }),
  new Rating ({
    _id: rating4Id,
    transcendance: 10,
    actualization: 6,
    aesthetics: 9,
    knowledge: 2,
    esteem: 2,
    love: 1,
    safety: 3,
    physiological: 4,
    highlights: "great stuff",
    lowlights: "yes sir",
    user: user4Id,
  }),
)

suggestions.push(
  new Suggestion({
    _id: suggestion1Id,
    body: "keep on building on your needs you did great",
    categoryTag: "aesthetics",
    likes: "2",
    dislikes: "15",
    dayRating: user2Id,
    user:user2Id
  }),

  new Suggestion({
    _id: suggestion2Id,
    body: "your rating can go higher if you practice meditation, really helped for me.",
    categoryTag: "transcendance",
    likes: "7",
    dislikes: "1",
    dayRating: rating2Id,
    user:user2Id
  }),
  new Suggestion({
    _id: suggestion3Id,
    body: "since you have the same focus on knowledge, reading books is a great start",
    categoryTag: "knowledge",
    likes: "4",
    dislikes: "5",
    dayRating: rating3Id,
    user: user4Id
  })
)


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

const insertSeeds = async () => {
  console.log("Resetting db and seeding users...");

  try {
    // Drop the collections
    await User.collection.drop();
    await Rating.collection.drop();
    await Suggestion.collection.drop();

    // Insert the documents
    await User.insertMany(users);
    await Rating.insertMany(ratings);
    await Suggestion.insertMany(suggestions);

    console.log("Done!");
    mongoose.disconnect();
  } catch (err) {
    console.error(err.stack);
    process.exit(1);
  }
};
