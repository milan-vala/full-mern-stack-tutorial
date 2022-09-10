const Workout = require("../models/Workout");
const mongoose = require("mongoose");

const getWorkouts = async (req, res) => {
  try {
    const response = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(response);
  } catch (error) {
    console.log("Error while getting all workouts: ", error.message);
    res.status(400).json({ error: error.message });
  }
};

const getWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "No workout found!" });
    }

    let workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ message: "No such workout." });
    }
    res.status(200).json(workout);
  } catch (error) {
    console.log("Error while getting a workout", error.message);
    res.status(400).json({ error: error.message });
  }
};

const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    let response = await Workout.create({ title, reps, load });
    res.status(200).json(response);
  } catch (error) {
    console.log("Error while creating workout: ", error.message);
    res.status(400).json({ error: error.message });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "invalid workout id provided." });
    }

    let workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout) {
      return res.status(404).json({ error: "The workout you want to delete is not exist." });
    }
    res.status(200).json(workout);
  } catch (error) {
    console.log("Error while deleting workout: ", error.message);
    res.status(400).json({ error: error.message });
  }
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "invalid workout id provided." });
    }
    let workout = await Workout.findOneAndUpdate({ _id: id }, req.body);
    if (!workout) {
      return res.status(404).json({ error: "The workout you want to update is not exist." });
    }
    res.status(200).json(workout);
  } catch (error) {
    console.log("Error while updating workout: ", error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
}