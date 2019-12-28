const express = require("express");
const router = express.Router();

//Item model
//need this to do queries, find,save etc
//capital letters for models
const Item = require("../../models/Item");

//@route GET request to API/items
//@desc Get all items
router.get("/", (req, res) => {
  Item.find().then(items => res.json(items));
});

//@route POST request to API/items
//@desc create a post
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.json(item));
});
module.exports = router;
