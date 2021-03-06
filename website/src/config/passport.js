const passport = require('passport');
const { strategy } = require('./strategies/discord.strategy');
strategy();

module.exports = function passportConfig(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    //stores user in session
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    // Retrieves user from session
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}