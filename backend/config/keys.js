module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET_OR_KEY,
  isProduction: process.env.NODE_ENV === 'production'
}
