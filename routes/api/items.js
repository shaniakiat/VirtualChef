const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

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
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    FoodFavorited: req.body.FoodFavorited,
    userCode: req.body.userCode
  });
  newItem
    .save()
    .then(item => res.json(item))
    .catch(err => console.log(err));
});

//@route DELETE request to API/items
//@desc delete an item
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

router.get("/item/:userCode", (req, res) => {
  Item.find({ userCode: req.params.userCode })
    .then(userFoodFavs => {
      if (!userFoodFavs) {
        console.log("This user has no food");
        return res.status(404).json.err;
      } else {
        console.log(userFoodFavs);
        return res.json(userFoodFavs);
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json(err);
    });
});

module.exports = router;
