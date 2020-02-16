const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//this schema is what the user favorite.

const FoodFavoritesSchema = new Schema({
  FoodFavorited: {
    type: String,
    required: true
  },
  //this is the user's object. we will map the food favorites to the user object ID
  userCode: {
    type: Schema.Types.ObjectId,
    ref: "item", // come back
    required: true
  }
});

module.exports = Feedback = mongoose.model(
  "foodFavorites",
  FoodFavoritesSchema
);
