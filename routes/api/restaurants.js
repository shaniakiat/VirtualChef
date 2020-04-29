const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//restaurant model
//need this to do queries, find,save etc
//capital letters for models
const Restaurant = require("../../models/Restaurant");

//@route GET request to API/restaurant
//@desc Get all restaurants
router.get("/", (req, res) => {
  Restaurant.find().then((restaurants) => res.json(restaurants));
});

//@route POST request to API/restaurants
//@desc create a post
router.post("/", auth, (req, res) => {
  const { RestaurantFavorited, userCode } = req.body;

  Restaurant.findOne({ RestaurantFavorited }).then((found) => {
    if (found)
      return res.status(400).json({ msg: "That's already in your list" });
    const newRestaurant = new Restaurant({
      RestaurantFavorited: req.body.RestaurantFavorited,
      userCode: req.body.userCode,
    });
    newRestaurant
      .save()
      .then((restaurant) => res.json(restaurant))
      .catch((err) => console.log(err));
  });
});

//@route DELETE request to API/restaurants
//@desc delete an restaurant
router.delete("/:id", auth, (req, res) => {
  Restaurant.findById(req.params.id)
    .then((restaurant) =>
      restaurant.remove().then(() => res.json({ success: true }))
    )
    .catch((err) => res.status(404).json({ success: false }));
});

router.get("/restaurant/:userCode", (req, res) => {
  Restaurant.find({ userCode: req.params.userCode })
    .then((userResFavs) => {
      if (!userResFavs) {
        console.log("This user has no restaurant");
        return res.status(404).json.err;
      } else {
        return res.json(userResFavs);
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
});

module.exports = router;
