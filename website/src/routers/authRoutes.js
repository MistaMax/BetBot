const express = require('express');
const passport = require('passport');
const scopes = require('../config/strategies/discord.strategy').scopes;
const prompt = require('../config/strategies/discord.strategy').prompt;
const {MongoClient} = require('mongodb');
const authRouter = express.Router();

function router(nav) {
    authRouter
        .get('/',passport.authenticate('discord', { scope: scopes, prompt: prompt }), function(req, res) {});
    authRouter
        .get('/callback',passport.authenticate('discord', { failureRedirect: '/' }), function(req, res) { res.redirect('/') });
    authRouter.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    return authRouter;
}

module.exports = router;