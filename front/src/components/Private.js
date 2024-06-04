import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const { token } = useSelector((state) => state.auth);

    if (token !== null)
        return children
    else
        // this is route which will be returned if jwt token is null means user has not signed up. 
        return <Navigate to="/" />


}

export default PrivateRoute;