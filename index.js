const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/user/create", async (req, res) => {
  const { firstName, lastName, phoneNumber, age } = req.body;

  // Create a new user in the database
  const newUser = await userModel.create({
    firstName,
    lastName,
    phoneNumber,
    age,
  });

  res.json({
    message: "User created successfully",
    data: newUser,
  });
});

app.get("/users", async (req, res) => {
  // Get all users from the database
  const users = await userModel.find({});

  res.json({
    message: "Users fetched successfully",
    data: users,
  });
});

app.patch("/user/:id", async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, age } = req.body;
    const { id } = req.params;

    const user = await userModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        firstName,
        lastName,
        phoneNumber,
        age,
      },
      {
        new: true,
      }
    );

    if (!user) throw new Error("User not found");

    res.json({
      message: "Updated user details",
      data: user,
    });
  } catch (error) {
    res.json({
      message: "User not found",
    });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findOne({
      _id: id,
    });

    if (!user) throw new Error("User not found");

    res.json({
      message: "user details fetched",
      data: user,
    });
  } catch (error) {
    res.json({
      message: "User not found",
    });
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findOneAndDelete({
      _id: id,
    });

    if (!user) throw new Error("User not found");

    res.json({
      message: "Deleted user",
    });
  } catch (error) {
    res.json({
      message: "User not found",
    });
  }
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
