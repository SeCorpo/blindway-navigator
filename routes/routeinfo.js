var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/info', function(req, res, next) {
    res.send('RouteInfo-page');
});

module.exports = router;
