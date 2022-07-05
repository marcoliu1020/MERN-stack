import React from "react"

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

// hooks
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const Home = () => {
    // 因為有 context，所以不用 useState 了
    // const [workouts, setWorkouts] = React.useState(null)

    const {workouts, dispatch} = useWorkoutsContext()


    React.useEffect(() => {
        const fetchWorkouts = async () => {
            console.log('fetch')

            // const response = await fetch('http://localhost:4000/api/workouts')

            // 因為 CORS 問題，所以在 package.json 裡增加了 "proxy": "http://localhost:4000"
            // package.json 有指定後端路徑，所以不用寫全部
            const response = await fetch('/api/workouts') 

            if (response.ok) {
                // await response.json()
                // > [{...}, {...}, {...}, ...]
                // setWorkouts(await response.json())

                dispatch({type: 'set_workouts', payload: await response.json()})
            }
        }
        fetchWorkouts()
    }, [dispatch])


    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    // <p key={workout._id}>{workout.title}</p>
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home