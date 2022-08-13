const express = require('express')

const { 
    getWorkout,
    getWorkouts,
    createWorkout, 
    deleteWorkout,
    updateWorkout,
} = require('../contollers/workoutController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET a single workout
// method - do not import controller file
// router.get('/:id', (req, res) => {
//     res.json({ msg: 'Get a single workout' })
// })

/**
 *  import contrller file
 */

// GET a single workout
router.get('/:id', getWorkout)

// GET all workouts
router.get('/', getWorkouts)

// post a new workout
router.post('/', createWorkout)

// delete a workout
router.delete('/:id', deleteWorkout)

// upadta a workout
router.patch('/:id', updateWorkout)

module.exports = router