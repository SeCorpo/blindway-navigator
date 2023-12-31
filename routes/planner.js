var express = require('express');
var router = express.Router();
// var db = require('../mysql_connection');
var Build = require('../ov_engine/build');
const path = require('path');

router.get('/', async (req, res) => {

    const { from, to, time, transferTime } = req.query;

    console.log('from:', from);
    console.log('to:', to);
    console.log('time:', time);
    console.log('transferTime:', transferTime);


    console.log('DEBUG: Planner: new build params - From: [', from, '] To: [', to, '] time: ', time, ' Transfertime: ', transferTime)

    const buildInstance = await new Build(from, to, time, transferTime);
    const routeFound = await buildInstance.getRouteFound();

    if (routeFound) {
        res.json({ routeFound: routeFound });
    } else {
        res.status(404).json({ error: 'No route found.' });
    }
});

module.exports = router;
