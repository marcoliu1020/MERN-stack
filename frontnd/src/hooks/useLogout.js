import useAuthContext from './useAuthContext'
import useWorkoutsContext from './useWorkoutsContext'

const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useWorkoutsContext()

    const logout = () => {
        // remove user from localStorage
        localStorage.removeItem('user')
        
        dispatch({ type: 'logout' })
        workoutsDispatch({ type: 'set_workouts', payload: null })
    }

    return { logout }
}
 
export default useLogout;