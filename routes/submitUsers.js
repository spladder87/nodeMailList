var express = require('express');

var router = express.Router();
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

router.post('/', urlencodedParser, function (req, res, next) {
  
  fs.readFile('users.json', (err,data) => {

    if (err) throw err;
    
    var users = JSON.parse(data);

    newUser = {
      "userName":"",
      "userEmail":""
    }

    newUser.userName = req.body.name;
    newUser.userEmail = req.body.email;

    console.log(newUser)
    users.push(newUser);

    var saveUsers = JSON.stringify(users, null, 2);

    fs.writeFile('users.json', saveUsers, (err, data) => {
      if (err) throw err;
    })

    res.send("Ny användare sparad!");
    })
  
});

module.exports = router;
