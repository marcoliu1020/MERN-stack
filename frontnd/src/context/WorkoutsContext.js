import React from "react";

export const WorkoutsContext = React.createContext(null)

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'set_workouts':
            return {
                workouts: action.payload
            }
        case 'create_workout':
            return {
                workouts: [action.payload, ...state.workouts]
            }
        default:
            return state
    }
}

const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(workoutsReducer, {
        workouts: null
    })
     
    return (
        // state = {workouts, ...}，把裡面的物件全部展開
        <WorkoutsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    )
}

export default WorkoutsContextProvider