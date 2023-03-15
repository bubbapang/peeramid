const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Rating = require('../models/Rating')
const Suggestion = require("../models/Suggestion")
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const users = [];
const ratings = [];

users.push(
  new User ({
    firstName: 'Madhur',
    lastName: 'Luthra',
    username: 'demo-user',
    email: 'madhur@user.io',
    hashedPassword: bcrypt.hashSync('starwars', 10)
  }),
    new User ({
    firstName: 'andre',
    lastName: 'hanna',
    username: 'andre01',
    email: 'andre@user.io',
    hashedPassword: bcrypt.hashSync('password', 10)
  }),
  new User ({
    firstName: 'adam',
    lastName: 'pen',
    username: 'adam01',
    email: 'adam@user.io',
    public: false,
    hashedPassword: bcrypt.hashSync('password', 10)
  }),
  new User ({
    firstName: 'jasmine',
    lastName: 'kobata',
    username: 'jasmine01',
    email: 'jasmine@user.io',
    hashedPassword: bcrypt.hashSync('password', 10)
  }),
)

ratings.push(
  new Rating ({
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
    user: "6410f061b5f29b490a72aed4",
  }),
  new Rating ({
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
    user: "6410f061b5f29b490a72aed5",
  }),
  new Rating ({
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
    user: "6410f061b5f29b490a72aed6"
  }),
  new Rating ({
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
    user: "6410f061b5f29b490a72aed7",
  }),
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

  const insertSeeds = () => {
  console.log("Resetting db and seeding users...");

  Rating.collection.drop()
                    .then(() => Rating.insertMany(ratings))
                    .then(() => {
                      console.log("Done!");
                      mongoose.disconnect();
                    });

//   User.collection.drop()
//                  .then(() => User.insertMany(users))
//                  .then(() => Rating.insertMany(ratings))
//                  .then(() => {
//                    console.log("Done!");
//                    mongoose.disconnect();
//                  })
//                  .catch(err => {
//                    console.error(err.stack);
//                    process.exit(1);
//                  });
}