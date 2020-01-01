const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//Item model
//need this to do queries, find,save etc
//capital letters for models
const User = require("../../models/User");

//@route POST request to API/users
//@desc resgisters all new users
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  //simple validation
  if (!name || !email || !password) {
    // bad request, user did not send response
    return res.status(400).json({ msg: "Pease enter all fields" });
  }

  //check for existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exist" });

    //else create a new user
    const newUser = new User({
      name,
      email,
      password
    });
    //creating password hash from plain text password (creating a salt & hash)
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          //user id will be in the token, it will know each user. otherwise any token can access anything
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            {
              expiresIn: 3600
            },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  name: user.id,
                  email: user.email,
                  password: user.password
                }
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
