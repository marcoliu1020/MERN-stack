import React from "react";

import useAuthContext from './useAuthContext'

const useSignup = () => {
    const [error, setError] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password) => {
        setError(null)
        setIsLoading(true)

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setIsLoading(false)
        }

        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            dispatch({ type: 'login', payload: json })

            setIsLoading(false)
        }
    }

    return { signup, error, isLoading }
}

export default useSignup