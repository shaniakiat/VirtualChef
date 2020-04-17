const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const fetch = require("node-fetch");
const mongo = require("mongodb");
const { URLSearchParams } = require("url");

//creating a new key
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

//predicting food
router.get("/predict/:id", (req, res) => {
  const key =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODUxMDQ1NDQsIm5iZiI6MTU4NTEwNDU0NCwianRpIjoiYjZjMmQ2MjQtMzI0Zi00NWExLWI5NDktN2I0NTUwYjY5OWIwIiwiaWRlbnRpdHkiOiJEYXZpZCIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.dJ9fA5dOjHYOv434xS03N0QQW0lspsKUGmEFcRbZW_s";
  let food = req.params.id;
  fetch(`https://floating-plains-35923.herokuapp.com/prediction/${food}`, {
    headers: {
      Authorization: `Bearer ${key}`,
    },
  })
    .then((res) => res.json())
    .then(function (data) {
      console.log(data); //expecting array
      res.status(200).send({ data });
    });
});

//getting restaurant from yelp api
router.get("/fetch-yelp/:long/:lat/:userYelpQuery", (req, res) => {
  const key =
    "lpT67Un7k91TqxKzp71z9e4DuS4PEt6_6qqXB16AqBI5zjOWultwA7R_XWAoMFhit3fhubCkFoCzccIwTc1bEqNgujNlzMniwqwQztNv905c9hsxkquvYmmzX5BUXnYx";
  let userYelpQuery = req.params.userYelpQuery;
  let longitude = req.params.long;
  let latitude = req.params.lat;

  const params = new URLSearchParams();
  params.append("latitude", latitude);
  params.append("longitude", longitude);

  fetch(
    `https://api.yelp.com/v3/businesses/search?term=${userYelpQuery}&latitude=${latitude}&longitude=${longitude}`,
    {
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then(function (data) {
      console.log(data); //expecting array
      res.status(200).send({ data });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
