const passport = require('passport')
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt  = passportJWT.ExtractJwt;

const User = require("./User")
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secretKey",
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {

    const user = await User.findByPk(jwtPayload.id)

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    
  })
);

module.exports = {
  jwtOptions
}