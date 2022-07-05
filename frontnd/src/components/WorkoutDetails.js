import React from "react"

import { useWorkoutsContext } from "../hooks/useWorkoutsContext" 

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()

    const handleClick = async () => {
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE',
        }) 

        const json = await response.json() // <- 後端回傳刪除的物件

        if (response.ok) {
            // local storage
            dispatch({type: 'delete_workout', payload: json})

            console.log(`delete ${workout._id}`)
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
            <span onClick={handleClick}>Delete</span>
        </div>
    )
}

export default WorkoutDetails