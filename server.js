require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");

mongoose.connect(process.env.MONGO_DB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("listeing on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("Error while connecting to databse: ", error);
  })

app.use(express.json());

app.use("/api/workouts", workoutRoutes);