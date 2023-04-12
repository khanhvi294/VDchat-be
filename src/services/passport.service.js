import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
import passportGoogle from "passport-google-oauth20";
import passportFacebook from "passport-facebook";
import authService from "./auth.service";

const FacebookStrategy = passportFacebook.Strategy;
const GoogleStrategy = passportGoogle.Strategy;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, callback) {
      try {
        let result = await authService.authGoogleSuccess(profile);
        callback(null, result);
      } catch (error) {
        callback(error, null);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, callback) {
      callback(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  // console.log("serializeUser ", user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // console.log("deserializeUser ", user);
  done(null, user);
});
