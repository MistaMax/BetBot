const express = require('express');
const balanceController = require('../controllers/balanceController');

const balanceRouter = express.Router();

function router(nav) {
    const { getDisplay } = balanceController(nav);
    balanceRouter.route('/')
        .get(getDisplay);
    return balanceRouter;
}

module.exports = router;