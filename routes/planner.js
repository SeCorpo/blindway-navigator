var express = require('express');
var router = express.Router();
var db = require('../mysql_connection');
var Build = require('../ov_engine/build');
const path = require('path');

router.get('/',  (req, res) => {

    const filePath = path.join(__dirname, '..', 'views', 'planner.html');
    res.sendFile(filePath);
});

    //const buildInstance = new Build('Haarlem', 'Den Bosch', '2023-09-22 12:00:00', 0);



module.exports = router;
