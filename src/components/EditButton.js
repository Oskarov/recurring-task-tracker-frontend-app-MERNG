import React, {useContext} from 'react'
import {Button, Icon} from "semantic-ui-react";
import {AuthContext} from "../context/auth";
import {Link} from "react-router-dom";


const EditButton = ({id, username}) => {

    const {user} = useContext(AuthContext);
    let editButton = '';
    if (user && user.username == username){
        editButton = <Button as='div' size="mini" color="blue" className="public-card-delete" as={Link} to={`/edit/${id}`}>
            <Icon name="edit"/>
        </Button>
    }

    return editButton
}

export default EditButton