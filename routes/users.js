var express = require('express');

var router = express.Router();
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });


/* GET users listing. */
router.get('/', function(req, res, next) {

  var html = '';
  html +="<body>";
  html +="<form action='/users' method='post' name='form2'>";
  html +="Användarnamn: <input type='text' name='username'></br>";
  html +="Lösenord: <input type='password' name='password'></br>";
  html +="<input type='submit' value='submit'>";
  html +="</form>";
  html +="</body>";
  res.send(html);

});

router.post('/', urlencodedParser, function (req, res, next) {
  
  fs.readFile('users.json', (err,data) => {
    
    if (err) throw err;
    
    if (req.body.username == "admin" && req.body.password == "test") {
      var users = JSON.parse(data);
      console.log("hola");
      var html='';
      html += "<ul>";
      for(var i = 0; i < users.length; i++){
        html += "<li>"+ users[i].userEmail + "</li>";
      }
      html += "</ul>";
      res.send(html);
    } else {
      res.redirect('/users');
    }
  
    })
  
});

router.post('/newuser', urlencodedParser, function (req, res, next) {
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
    console.log("New user added");
    res.redirect('/');
    })
  
});


module.exports = router;
