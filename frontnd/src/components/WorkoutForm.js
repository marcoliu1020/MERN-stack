import React from "react"
// import axios from 'axios'

const WorkoutForm = ({ workouts, setWorkouts }) => {
    const [title, setTitle] = React.useState('')
    const [load, setLoad] = React.useState('')
    const [reps, setReps] = React.useState('')
    const [error, setError] = React.useState(null)

    const handleSumbit = async e => {
        e.preventDefault()

        const workout = {title, load, reps}

        // method - fetch
        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            // console.log(json)
            setError(json.error)
        }

        if (response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setWorkouts(prev => [json, ...prev])
            console.log('new workout added', json)
        }

        // method - axios
        // try {
        //     const response = await axios.post('/api/workouts', workout)
        //     setTitle('')
        //     setLoad('')
        //     setReps('')
        //     setError(null)
        //     console.log('new workout added', response)
        // } catch (error) {
        //     setError(error.response.data.error)
        // }
    }

    return (
        <form className="create" onSubmit={handleSumbit}>
            <h3>Add a New Workout</h3>

            <label>Excersize Title:</label>
            <input 
                type="text"
                onChange={e => setTitle(e.target.value)}
                value={title}
            />

            <label>Load (in kg):</label>
            <input 
                type="number"
                onChange={e => setLoad(e.target.value)}
                value={load}
            />

            <label>Reps:</label>
            <input 
                type="number"
                onChange={e => setReps(e.target.value)}
                value={reps}
            />

            <button>Add Workout</button>

            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm