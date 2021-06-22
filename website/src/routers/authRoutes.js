const express = require('express');

const authRouter = express.Router();

function router(nav) {
    authRouter.route('/')
        .get((req,res) => {

        });
    return authRouter;
}

module.exports = router;