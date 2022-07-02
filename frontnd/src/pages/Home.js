import React from "react"
// import axios from 'axios'

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

// import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const Home = () => {
    // 因為有 context，所以不用 useState 了
    const [workouts, setWorkouts] = React.useState(null)


    // const {workouts, dispatch} = React.useWorkoutsContext()


    React.useEffect(() => {
        const fetchWorkouts = async () => {
            console.log('fetch')

            // 因為 CORS 問題，所以在 package.json 裡增加了 "proxy": "http://localhost:4000"
            // const response = await fetch('http://localhost:4000/api/workouts')

            // method - fetch
            const response = await fetch('/api/workouts') // 因為 package.json 有指定後端路徑，所以不用寫全部

            if (response.ok) {
                // await response.json()
                // > [{...}, {...}, {...}, ...]
                setWorkouts(await response.json())

                // dispatch({type: 'SET_WORKOUTS', payload: await response.json()})
            }

            // method - axios
            // const response = await axios.get('/api/workouts')
            // if (response.statusText === 'OK') {
            //     // response.data
            //     // > [{...}, {...}, {...}, ...]
            //     setWorkouts(response.data)
            // }

            /**
             *   fetch, axios 回傳的物件是不同的
             */
        }
        fetchWorkouts()
    }, [])


    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    // <p key={workout._id}>{workout.title}</p>
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm workouts={workouts} setWorkouts={setWorkouts} />
        </div>
    )
}

export default Home