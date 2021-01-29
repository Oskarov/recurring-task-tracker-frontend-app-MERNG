import React, {useContext} from 'react';
import {AuthContext} from "../context/auth";

const AddComment = (props) => {
    const {user} = useContext(AuthContext);
    let component = 'asd';
    if (!user){
        component = <p>Только зарегистрированные пользователи могут оставлять комментарии</p>
    } else {

        component = <>
123
        </>
    }

    return component;
}

export default AddComment;
