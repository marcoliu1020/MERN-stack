import React from "react";

export const WorkoutsContext = React.createContext(null)

const WorkoutsContextProvider = ({ children }) => {
    const [workouts, setWorkouts] = React.useState(null)

    return (
        <WorkoutsContext.Provider value={{ workouts, setWorkouts }}>
            {children}
        </WorkoutsContext.Provider>
    )
}

export default WorkoutsContextProvider