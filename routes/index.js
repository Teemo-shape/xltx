var express = require('express');
var router = express.Router();
var Mock = require('mockjs')
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/*/undefined', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data=""
    console.log('出现请求错误！')
    res.send(data);
});

module.exports = router;