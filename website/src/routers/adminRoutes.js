const express = require('express');
const adminController = require('../controllers/adminController');

const adminRouter = express.Router();

function router(nav) {
    const { getDisplay } = adminController(nav);
    adminRouter.route('/')
        .get(getDisplay);
    return adminRouter;
}

module.exports = router;