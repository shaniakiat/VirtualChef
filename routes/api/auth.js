const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

//Item model
//need this to do queries, find,save etc
//capital letters for models
const User = require("../../models/User");

//@route POST request to API/users
//@desc authenticate the users
router.post("/", (req, res) => {
  const { email, password } = req.body;

  //simple validation
  if (!email || !password) {
    // bad request, user did not send response
    return res.status(400).json({ msg: "Pease enter all fields" });
  }

  //check for existing user
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    //validating the passwords
    // user.password == the hashed password that bcrpyt made for us
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "invalid credentials" });

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
              name: user.name,
              email: user.email,
              password: user.password
            }
          });
        }
      );
    });
  });
});

//@route GET request to API/auth/user
//@desc get the user data
//@access private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
