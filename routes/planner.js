var express = require('express');
var router = express.Router();
// var db = require('../mysql_connection');
var Build = require('../ov_engine/build');
const path = require('path');

router.get('/', (req, res) => {

    const { from, to, time, transferTime } = req.query;

    console.log('from:', from);
    console.log('to:', to);
    console.log('time:', time);
    console.log('transferTime:', transferTime);

    const buildInstance = new Build(from, to, time, transferTime);

    res.json({
        routeString: buildInstance.routeString,
    });
});

module.exports = router;
