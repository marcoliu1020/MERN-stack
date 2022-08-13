const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  // create a object
  // {title: ..., reps: ..., load: ..., createdAt: ..., updatedAt, ...}
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },

    // 建立的物件需要對應 user id
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// 'Workout' will be reanme as 'workouts' in collection in MongoDB
module.exports = mongoose.model("Workout", workoutSchema);
