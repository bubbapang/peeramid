const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const users = [];


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

  User.collection.drop()
                 .then(() => User.insertMany(users))
                 .then(() => {
                   console.log("Done!");
                   mongoose.disconnect();
                 })
                 .catch(err => {
                   console.error(err.stack);
                   process.exit(1);
                 });
}