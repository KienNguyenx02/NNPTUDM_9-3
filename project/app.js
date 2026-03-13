const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

const sequelize = require("./config/database");

const User = require("./models/user.model");
const Product = require("./models/product.model");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");

const app = express();
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);

sequelize.sync({ force: true }).then(async () => {

  await User.create({
    username: "admin",
    password: bcrypt.hashSync("123456",8),
    role: "admin"
  });

  await User.create({
    username: "mod",
    password: bcrypt.hashSync("123456",8),
    role: "mod"
  });

  await User.create({
    username: "user",
    password: bcrypt.hashSync("123456",8),
    role: "user"
  });

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });

});