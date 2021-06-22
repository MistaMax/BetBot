const express = require('express');
const passport = require('passport');
const {MongoClient} = require('mongodb');
const authRouter = express.Router();

function router(nav) {
    authRouter.route('/')
        .get((req,res) => {

        });
    return authRouter;
}

module.exports = router;