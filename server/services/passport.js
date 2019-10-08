const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  // here "user" is mongoose model instance
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // here is the oposite - we're turning the "id" into a mongoose model instance
  User.findById(id)
    .then(user => done(null, user))
    .catch(err => console.log(err));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) return done(null, existingUser);

      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
