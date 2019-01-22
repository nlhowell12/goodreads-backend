const User = require('../models/user.model');


exports.signup = function (req, res) {

    const data = req.body;
    let newUser = new User({
      username: data.username,
      favorites: [],
      isAdmin: false,
      password: data.password
    });
  
    User.find({username: data.username}, (err, user) => {
      if (user.length > 0) {
        res.send(false)
      } else {
        newUser.save((err) => {
          if (err) {
            console.log(err);
          } else {
            res.send(true);
          }
        })
      }
    })

};


exports.login = function (req, res) {

    const data = req.body;
    User.find({username: data.username, password: data.password }, (err, user) => {
      if (user.length > 0) {
        req.body.isLoggedIn = true;
        delete req.body.password
        res.status(201);
        res.send(req.body);
      } else {
        req.body.isLoggedIn = false;
        delete req.body.password
        res.status(401);
        res.send(req.body);
      }
    })

};