var express = require('express');
var router = express.Router();
var db = require('../mysql_connection');
var Build = require('../ov_engine/build');
const path = require('path');

router.get('/',  (req, res) => {

    const filePath = path.join(__dirname, '..', 'views', 'planner.html');
    res.sendFile(filePath);
});




module.exports = router;
