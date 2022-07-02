require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// express app
const app = express()

// middleware
app.use(express.json()) // get req.body as json

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
// app.get('/', (req, res) => {
//     res.json({ msg: "Welcome to the app" })
// })

// routes
// path: localhost:4000/api/workouts/workoutRoutes
app.use('/api/workouts', workoutRoutes)

// connect DB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // listen for request
    app.listen(process.env.PORT, () => {
        console.log(`connect to db && listening on port ${process.env.PORT}`)
    })
})
.catch(err => {
    console.log(err)
})

