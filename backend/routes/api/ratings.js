const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Rating = mongoose.model('Rating');


module.exports = router