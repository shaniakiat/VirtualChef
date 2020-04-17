const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const fetch = require("node-fetch");
const mongo = require("mongodb");

router.get("/create-key/:id", (req, res) => {
  var o_id = new mongo.ObjectID(req.params.id);
  User.findOne({
    $and: [{ _id: o_id }, { "apikey.access_token": { $exists: false } }],
  }).exec((err, user) => {
    if (err) {
      console.log(err);
    } else {
      fetch(`https://floating-plains-35923.herokuapp.com/genkey/${o_id}`);
      console.log(user);
    }
  });
});

router.get("/predict/:id", (req, res) => {
  let response = [];
  const key =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODUxMDQ1NDQsIm5iZiI6MTU4NTEwNDU0NCwianRpIjoiYjZjMmQ2MjQtMzI0Zi00NWExLWI5NDktN2I0NTUwYjY5OWIwIiwiaWRlbnRpdHkiOiJEYXZpZCIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.dJ9fA5dOjHYOv434xS03N0QQW0lspsKUGmEFcRbZW_s";
  let food = req.params.id;
  // https://stackoverflow.com/questions/54555778/async-await-fetch-in-node-js
  // https://stackoverflow.com/questions/51369866/calling-an-api-endpoint-from-within-another-route-in-node-express

  fetch(`https://floating-plains-35923.herokuapp.com/prediction/${food}`, {
    headers: {
      Authorization: `Bearer ${key}`,
    },
  })
    .then((res) => res.json())
    .then(function (data) {
      console.log(data); //expecting array
      res.status(200).send({ data });
      //note: changed to ({data}) do not know the difference
    });
});
module.exports = router;
