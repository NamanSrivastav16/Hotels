const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/Person");

passport.use(
  new LocalStrategy(async (Username, password, done) => {
    // authentication logic
    try {
      console.log("Received Credentials: ", Username, password);
      const user = await Person.findOne({ username: Username });

      if (!user) {
        return done(null, false, { message: "Incorrect Username." });
      }
      const isPasswordMatch = await user.comparePassword(password);
      console.log(isPasswordMatch);

      if (isPasswordMatch) {
        return done(null, user);
      } else {
        console.log("llllaaaaaaa");
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
