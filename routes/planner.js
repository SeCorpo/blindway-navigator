var express = require('express');
var router = express.Router();
var db = require('../mysql_connection');
//var Search = require('../ov_engine/search');
var Build = require('../ov_engine/build');

router.get('/', async function(req, res, next) {

    try {
        const q = 'SELECT station_name FROM selectable_stations';
        const results = await db.query(q);

        res.render('indexyannick', {title: 'OVapp', stations: results});

        //TEST
        //const search = new Search('Amersfoort', '2023-09-20 12:00:00');

        const buildInstance = new Build('Haarlem', 'Den Bosch', '2023-09-22 12:00:00', 0);

    } catch(error) {
        console.error("Error fetching server table: ", error);
        res.status(500).send('Internal Server Error');
    }

});


module.exports = router;
