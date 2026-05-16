import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Protected = ({children}) => {

    const user = useSelector(state => state.auth.user)
    const Loading = useSelector(state => state.auth.loading)

    if(Loading) {
        return <div>Loading...</div>
    }

    if(!user) {
        return <Navigate to="/login" replace />
    }

    return children
  
}

export default Protected
