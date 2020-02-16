const express = require("express");
const router = express.Router();

const foodFavorites = require("../../models/FoodFavorites");

router.get("/foodfavorites/:userCode", (req, res) => {
  const errors = {};
  Feedback.find({ userCode: req.params.userCode })
    .then(userFoodFavs => {
      if (!userFoodFavs) {
        console.log("no teacher feedback");
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
