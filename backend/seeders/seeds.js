const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Rating = require('../models/Rating')
const Suggestion = require("../models/Suggestion")
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongoose').Types;


function generatePastDate(daysAgo) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
}

const user1Id = new ObjectId();
const user2Id = new ObjectId();
const user3Id = new ObjectId();
const user4Id = new ObjectId();
const user5Id = new ObjectId();
const user6Id = new ObjectId();
const user7Id = new ObjectId();
const user8Id = new ObjectId();
const user9Id = new ObjectId();
const user10Id = new ObjectId();

const rating4Id = new ObjectId();


const users = [];
const ratings = [];
const suggestions = [];

const highlightsArr = [
  "Had a productive day at work.",
  "Spent quality time with family.",
  "Finished reading a great book.",
  "Went for a long walk.",
  "Completed a challenging workout.",
  "Had an insightful conversation with a friend.",
  "Made progress on a personal project.",
  "Had a productive day at work.",
  "Spent quality time with family.",
  "Finished reading a great book.",
  "Went for a long walk.",
  "Completed a challenging workout.",
  "Had an insightful conversation with a friend.",
  "Made progress on a personal project.",
  "Cooked a delicious meal.",
  "Helped a friend with a problem.",
  "Learned a new skill.",
  "Received positive feedback at work.",
  "Made a new connection.",
  "Volunteered for a good cause.",
  "Completed a home improvement project.",
  "Took time for self-care.",
  "Listened to an inspiring podcast.",
];

const lowlightsArr = [
  "Had a disagreement with a colleague.",
  "Missed an important deadline.",
  "Felt overwhelmed by tasks.",
  "Struggled with time management.",
  "Procrastinated on a project.",
  "Skipped a workout session.",
  "Had difficulty sleeping.",
  "Had a disagreement with a colleague.",
  "Missed an important deadline.",
  "Felt overwhelmed by tasks.",
  "Struggled with time management.",
  "Procrastinated on a project.",
  "Skipped a workout session.",
  "Had difficulty sleeping.",
  "Faced a challenging personal issue.",
  "Dealt with a frustrating situation.",
  "Lost track of time on social media.",
  "Felt stressed about upcoming events.",
  "Had trouble focusing on work.",
  "Didn't stick to a healthy diet.",
  "Missed an appointment.",
  "Struggled with motivation.",
  "Faced a setback on a personal goal.",
];

users.push(
  new User ({
    _id: user1Id,
    firstName: 'Madhur',
    lastName: 'Luthra',
    username: 'demo-user',
    email: 'madhur@user.io',
    // pins: [suggestion1Id, suggestion2Id, suggestion3Id],
    followers: [user2Id, user3Id, user4Id],
    following: [user2Id, user3Id, user4Id],
    hashedPassword: bcrypt.hashSync('starwars', 10)
  }),
    new User ({
    _id: user2Id,
    firstName: 'andre',
    lastName: 'hanna',
    username: 'andre01',
    email: 'andre@user.io',
    // pins: [suggestion1Id, suggestion2Id, suggestion3Id],
    followers: [user1Id, user3Id, user4Id],
    following: [user1Id, user3Id, user4Id],
    hashedPassword: bcrypt.hashSync('password', 10)
  }),
  new User ({
    _id: user3Id,
    firstName: 'adam',
    lastName: 'pen',
    username: 'adam01',
    email: 'adam@user.io',
    public: false,
    // pins: [suggestion1Id, suggestion2Id, suggestion3Id],
    followers: [user2Id, user1Id, user4Id],
    following: [user2Id, user1Id, user4Id],
    hashedPassword: bcrypt.hashSync('password', 10)
  }),
  new User ({
    _id: user4Id,
    firstName: 'jasmine',
    lastName: 'kobata',
    username: 'jasmine01',
    email: 'jasmine@user.io',
    followers: [user2Id, user3Id, user1Id],
    following: [user2Id, user3Id, user1Id],
    // likes: [suggestion1Id, suggestion2Id, suggestion3Id],
    // pins: [suggestion1Id, suggestion2Id, suggestion3Id],
    hashedPassword: bcrypt.hashSync('password', 10)
  }),
  new User ({
    _id: user5Id,
    firstName: 'chris',
    lastName: 'cheasty',
    username: 'chris01',
    email: 'chris@user.io',
    followers: [user2Id, user3Id, user1Id],
    following: [user2Id, user3Id, user1Id],
    // likes: [suggestion1Id, suggestion2Id, suggestion3Id],
    // pins: [suggestion1Id, suggestion2Id, suggestion3Id],
    hashedPassword: bcrypt.hashSync('password', 10)
  }),
  new User ({
    _id: user6Id,
    firstName: 'james',
    lastName: 'james',
    username: 'james01',
    email: 'james01@user.io',
    followers: [user2Id, user3Id, user1Id],
    following: [user2Id, user3Id, user1Id],
    // likes: [suggestion1Id, suggestion2Id, suggestion3Id],
    // pins: [suggestion1Id, suggestion2Id, suggestion3Id],
    hashedPassword: bcrypt.hashSync('password', 10)
  }),
  new User ({
    _id: user7Id,
    firstName: 'kenny',
    lastName: 'daCoolest',
    username: 'kenny01',
    email: 'kenny@user.io',
    followers: [user2Id, user3Id, user1Id],
    following: [user2Id, user3Id, user1Id],
    // likes: [suggestion1Id, suggestion2Id, suggestion3Id],
    // pins: [suggestion1Id, suggestion2Id, suggestion3Id],
    hashedPassword: bcrypt.hashSync('password', 10)
  }),
  new User ({
    _id: user8Id,
    firstName: 'Mila',
    lastName: 'Smith',
    username: 'mila_smith',
    email: 'mila@user.io',
    followers: [user4Id, user1Id, user3Id],
    following: [user4Id, user1Id, user3Id],
    // likes: [suggestion4Id, suggestion1Id, suggestion2Id],
    // pins: [suggestion4Id, suggestion1Id, suggestion2Id],
    hashedPassword: bcrypt.hashSync('password', 10)
    }),
    new User ({
      _id: user9Id,
      firstName: 'Tom',
      lastName: 'Johnson',
      username: 'tom_johnson',
      email: 'tom@user.io',
      followers: [user6Id, user4Id, user1Id],
      following: [user6Id, user4Id, user1Id],
      // likes: [suggestion3Id, suggestion1Id, suggestion4Id],
      // pins: [suggestion3Id, suggestion1Id, suggestion4Id],
      hashedPassword: bcrypt.hashSync('password', 10)
      }),
      
      new User ({
      _id: user10Id,
      firstName: 'Sophie',
      lastName: 'Taylor',
      username: 'sophie_taylor',
      email: 'sophie@user.io',
      followers: [user5Id, user3Id, user2Id],
      following: [user5Id, user3Id, user2Id],
      // likes: [suggestion2Id, suggestion4Id, suggestion1Id],
      // pins: [suggestion2Id, suggestion4Id, suggestion1Id],
      hashedPassword: bcrypt.hashSync('password', 10)
      })
)
const userIDs = [
  user1Id, user2Id, user3Id, user4Id, user5Id,
  user6Id, user7Id, user8Id, user9Id, user10Id
];

const getDate = (dayOffset) => {
  const date = new Date();
  date.setDate(date.getDate() - dayOffset);
  return date;
};

userIDs.forEach(userId => {
  for (let i = 0; i < 5; i++) {
    const ratingId = new ObjectId();
    const rating = new Rating({
      _id: ratingId,
      transcendance: Math.floor(Math.random() * 10) + 1,
      actualization: Math.floor(Math.random() * 10) + 1,
      aesthetics: Math.floor(Math.random() * 10) + 1,
      knowledge: Math.floor(Math.random() * 10) + 1,
      esteem: Math.floor(Math.random() * 10) + 1,
      love: Math.floor(Math.random() * 10) + 1,
      safety: Math.floor(Math.random() * 10) + 1,
      physiological: Math.floor(Math.random() * 10) + 1,
      highlights:highlightsArr[Math.floor(Math.random() * highlightsArr.length)],
      lowlights:lowlightsArr[Math.floor(Math.random() * lowlightsArr.length)],
      user: userId,
      createdAt: getDate(5 - i),
      updatedAt: getDate(5 - i),
    });

    ratings.push(rating);
  }
});

const rating4 = new Rating ({
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
    user: user4Id
  });
const pastDate = generatePastDate(3);
rating4.createdAt = pastDate;
rating4.updatedAt = pastDate;

  ratings.push(rating4)

const suggestionsData = [
  {
    body: "To improve your sense of safety, try to surround yourself with positive and supportive people.",
    categoryTag: "Safety",
  },
  {
    body: "To increase your self-esteem, practice positive affirmations and focus on your accomplishments.",
    categoryTag: "Esteem",
  },
  {
    body: "To enhance your love and relationships, work on your communication skills and express your feelings openly.",
    categoryTag: "Love",
  },
  {
    body: "To boost your knowledge, try to read at least one book per month in various fields.",
    categoryTag: "Knowledge",
  },
  {
    body: "To improve your aesthetics, explore new forms of art and try to incorporate them into your daily life.",
    categoryTag: "Aesthetics",
  },
  {
    body: "To work on your actualization, set clear goals for yourself and regularly review your progress.",
    categoryTag: "Actualization",
  },
  {
    body: "To achieve transcendence, practice mindfulness and meditation to connect with your inner self.",
    categoryTag: "Transcendence",
  },
  {
    body: "For better physiological well-being, maintain a balanced diet and exercise regularly.",
    categoryTag: "Physiological",
  },
];

userIDs.forEach((userId, index) => {
  for (let i = 0; i < 2; i++) {
    const suggestionData = suggestionsData[(index + i) % suggestionsData.length];
    const suggestion = new Suggestion({
      _id: new ObjectId(),
      body: suggestionData.body,
      categoryTag: suggestionData.categoryTag,
      dayRating: ratings[index]._id,
      pins: [user4Id],
      likes: [user4Id],
      user: userId,
    });

    suggestions.push(suggestion);
  }
});


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

