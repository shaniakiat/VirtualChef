const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

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
          res.json({
            user: {
              name: user.id,
              email: user.email,
              password: user.password
            }
          });
        });
      });
    });
  });
});

module.exports = router;
