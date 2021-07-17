const express = require('express');

const betRouter = express.Router();

function router(nav) {
    const { getDisplay } = require('../controllers/betController')(nav);
    betRouter.get('/',getDisplay);
    return betRouter;
}

module.exports = router;