var express = require('express');

var router = express.Router();
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });


/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readFile('users.json', (err,data) => {

    if (err) throw err;
    
    var users = JSON.parse(data);

    res.send(users);
    })
});


module.exports = router;
