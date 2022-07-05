const Workout = require('../models/workout_model')
const mongoose = require('mongoose')

// get a single workout
const getWorkout = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).json({ error: 'No such workout' })

    const workout = await Workout.findById(req.params.id)

    if (!workout)
        return res.status(404).json({ error: 'No such workout' }) // added return prevent go next line

    res.status(200).json(workout)
}

// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 })
    res.status(200).json(workouts)
} 

// create new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body

    // 讓前端可以更清楚顯示錯誤訊息
    let emptyFields = []

    if (!title)
        emptyFields.push('title')
    if (!load)
        emptyFields.push('load')
    if (!reps)
        emptyFields.push('reps')
    if (emptyFields.length > 0)
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })

    // add document to DB
    try {
        // const workout = await Workout.create(req.body) // implicity
        const workout = await Workout.create({ title, load, reps })
        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
    // res.json({ msg: 'Post a new workout' })
}

// delete a workout 
const deleteWorkout = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).json({ error: 'No such workout' })

    const workout = await Workout.findByIdAndDelete(req.params.id)
    // const workout = await Workout.findOneAndDelete({ _id: req.params.id })

    if (!workout) 
        return res.status(404).json({ error: 'No such workout' })

    res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).json({ error: 'No such workout' })
        
    const workout = await Workout.findByIdAndUpdate(req.params.id, {$set: req.body})
    // const workout = await Workout.findOneAndUpdate({_id: req.params.id}, req.body)
    // const workout = await Workout.findOneAndUpdate({_id: req.params.id}, {...req.body})
        
    if (!workout)
        return res.status(404).json({ error: 'No such workout' })
    
    res.status(200).json(workout)
}


module.exports = {
    getWorkout,
    getWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkout,
}