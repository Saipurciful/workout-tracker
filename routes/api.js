// public/api.js
const router = require("express").Router();
const { db } = require("../models/workout.js");
const Workout = require("../models/workout.js");

router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(params.id,
        { $push: { exercises: body } })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

router.get("/api/workouts", (req, res) => {
    Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});
router.get("/api/workouts/range", (req, res) => {

    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$duration" },
                // totalWeight: { $sum: "$weight" }
            }
        },
        {
            $addFields: {
                totalExercises:
                    { $add: ["$totalDuration", "$weight", "$reps", "$sets", "$distance"] }
            },
        }
    ])
        // Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});
module.exports = router;
