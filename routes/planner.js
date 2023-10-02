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

    const timeString = req.query.time; // Get the time parameter from the query string
    const timeParsed = new Date(timeString); // Parse it into a Date object

    console.log('Planner: new build - From: [', from, '] To: [', to, '] TimeParsed: ', timeParsed, ' Transfertime: ', transferTime)

    const buildInstance = new Build(from, to, timeParsed, transferTime);



    res.json({
        routeString: buildInstance.routeString,
    });
});

module.exports = router;
