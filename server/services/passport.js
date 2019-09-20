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
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then(existingUser => {
          if (!existingUser) {
            new User({ googleId: profile.id })
              .save()
              .then(user => done(null, user))
              .catch(err => console.log(err));
          } else {
            done(null, existingUser);
          }
        })
        .catch(err => console.log(err));
    }
  )
);
