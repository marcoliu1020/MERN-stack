import React from "react"
// import axios from 'axios'

import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutForm = () => {
    const [title, setTitle] = React.useState('')
    const [load, setLoad] = React.useState('')
    const [reps, setReps] = React.useState('')
    const [error, setError] = React.useState(null)
    const [emptyFields, setEmptyFields] = React.useState([])

    const { dispatch } = useWorkoutsContext()

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
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('new workout added', json)
            dispatch({type: 'create_workout', payload: json})
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
            <h3>Add a New Training</h3>

            <label>Excersize Title:</label>
            <input 
                type="text"
                onChange={e => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load (in kg):</label>
            <input 
                type="number"
                onChange={e => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Reps:</label>
            <input 
                type="number"
                onChange={e => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add Workout</button>

            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm