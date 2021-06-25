//http://www.passportjs.org/packages/passport-discord/
//https://github.com/nicholastay/passport-discord.git
const passport = require('passport');
const { Strategy } = require('passport-discord');
const config = require('../../../../config.json');
const scopes = ['identify'/*, 'email', 'connections', (it is currently broken)  'guilds', 'guilds.join'*/];
const prompt = 'consent'

module.exports.scopes = scopes;
module.exports.prompt = prompt;

module.exports.strategy = () => {
    passport.use(new Strategy({
        clientID: config.authorization.clientID,
        clientSecret: config.authorization.clientSecret,
        callbackURL: 'http://localhost:3000/auth/callback',
        scope: scopes,
        prompt: prompt
    }, (accessToken, refreshToken, profile, done) => {
        process.nextTick(function () {
            return done(null, profile);
        });
    }));
};