const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create a schema, this schema will have the fields we want
//so like name is a string
//id is an int, also has option to make it required or not
const ItemSchema = new Schema({
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
module.exports = Item = mongoose.model("item", ItemSchema);
