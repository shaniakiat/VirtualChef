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

//@route DELETE request to API/items
//@desc delete an item
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
