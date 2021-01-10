import React, {useContext} from "react";
import {Route, Redirect} from 'react-router-dom';
import {AuthContext} from "../context/auth";

const UserRoute = ({component: Component, ...rest}) => {
    const {user} = useContext(AuthContext);

    return (
        <Route {...rest} render={props => user ? <Component {...props}/> : <Redirect to="/login"/>}/>
    )
}

export default UserRoute;
