// info from seed.js


const mongoose = require("mongoose");
const { stringify } = require("querystring");
const { Workout } = require(".");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        type: {
            type: String,
            trim: true,
            required: "Please enter the type of exercise"
        },
        name: {
            type: String,
            trim: true,
            required: "Please enter the name of exercise"
        },
        duration: {
            type: Number,
            required: "Please enter minutes of your duration exercise"
        },
        weight: {
            type: Number,
            required: "Please enter weight"
        },
        reps: {
            type: Number,
            required: "Please enter number of reps"
        },
        sets: {
            type: Number,
            required: "Please enter number of sets"
        },
        distance: {
            type: Number
        }
    }]

});

const Note = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
