const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create a schema, this schema will have the fields we want
//so like name is a string
//id is an int, also has option to make it required or not
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});
module.exports = Item = mongoose.model("item", ItemSchema);
