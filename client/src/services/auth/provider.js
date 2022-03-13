import React, { useState, useEffect, useCallback } from "react"
import { AuthContext, authMethods } from "./index"

const getDefaultState = () => {
    const storageUser = localStorage.getItem("user")
    const storageToken = localStorage.getItem("accessToken")
    if (storageToken) {
        return {
            user: {},
            accessToken: storageToken,
        }
    }
    return {
        user: {},
        accessToken: null,
    }
}

const AuthProvider = ({ children }) => {
    const [contextState, setContextState] = useState(getDefaultState())
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(
        contextState.accessToken === null ? true : false
    )

    const setContext = useCallback(
        (updates) => {
            setContextState({ ...contextState, ...updates })
            for (const [key, value] of Object.entries(contextState)) {
                if (value) {
                    localStorage.setItem(key, value)
                }
            }
        },
        [contextState, setContextState]
    )

    const getContextValue = useCallback(
        () => ({
            ...contextState,
            toggleLoggedOut: () => toggleLoggedOut(),
            setContext,
        }),
        [contextState, setContext]
    )

    const toggleLoggedOut = async () => {
        await authMethods.signOut()
        setContext(getDefaultState())
    }

    /**
     * 
     * if (loading) {
        return <span>loading ...</span>
    }
     */

    if (error) {
        return <span>{error.message}</span>
    }

    return (
        <AuthContext.Provider value={getContextValue()}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider }
