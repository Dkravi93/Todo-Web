require("dotenv").config();
const express = require("express");
const app = express();
const path = require('path');
const user = require("./public/user.json");



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use("/users", require("./handlers/userHandler"));
app.use("/usersTask" , require("./handlers/TaskHandler"));
port = process.env.PORT || 2345;
app.listen(port,() => {
  console.log(`Listening on port ${port}`);
});

