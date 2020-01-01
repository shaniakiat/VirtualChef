const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const items = require("./routes/api/items");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");

const app = express();

const config = require("config");
//bodyparser middleware
app.use(express.json());

//database config
const db = config.get("mongoURI");

//connecting to MOngo
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));

//use routes
app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/auth", auth);

//serve static assests
if (process.env.NODE_ENV === "production") {
  //set a static foldder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
