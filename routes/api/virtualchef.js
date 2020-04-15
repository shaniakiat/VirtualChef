const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const fetch = require("node-fetch");
const mongo = require("mongodb");

router.get("/create-key/:id", (req, res) => {
  //add query parameters **
  console.log(req.params.id);

  var o_id = new mongo.ObjectID(req.params.id);
  User.findOne({
    $and: [{ _id: o_id }, { "apikey.access_token": { $exists: false } }],
  }).exec((err, user) => {
    if (err) {
      console.log(err);
    } else {
      //create the key with flask endpoint
      // console.log(user);
      fetch(`https://floating-plains-35923.herokuapp.com/genkey/${o_id}`);
      console.log(user);
    }
  });

  /*(this works
  User.find({ "apikey.access_token": { $exists: true } }).then((users) => {
    return res.json(users);
  });*/

  // User.find({ "apikey.access": { $exists: true } }).toArray((err, result) => {
  //   if (err) {
  //     console.log("The search errored");
  //   } else if (validate.isEmpty(result)) {
  //     console.log("record not found");
  //   } else {
  //     console.log(result);
  //   }
  // });

  //need to create key then save the key back into the model**

  // User.findOne({ apikey }).then((user) => {
  //   if (user) {
  //     console.log(typeof user);
  //     //check if user has key**

  //     return res
  //       .status(400)
  //       .json({ msg: "You already have an api key created" });
  //   } else {
  //     fetch(`https://floating-plains-35923.herokuapp.com/create`).then(
  //       (res) => {
  //         return res;
  //       }
  //     );
  //   }
  // });
});
module.exports = router;
