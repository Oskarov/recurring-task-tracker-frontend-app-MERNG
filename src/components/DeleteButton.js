import React, {useContext, useState} from 'react'
import {Button, Icon, Confirm} from "semantic-ui-react";
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {AuthContext} from "../context/auth";
import {Link} from "react-router-dom";


const DeleteButton = ({id, username, history}) => {

    const [confirmOpen, setConfirmOpen] = useState(false);

    const [deletePost] = useMutation(DELETE_TASK_MUTATION, {
        variables: {postId : id},
        update(){
            setConfirmOpen(false);
            history.push('/');
        }
    })

    const {user} = useContext(AuthContext);

    const button = user.username == username ?
        <>
            <Button as='div' size="mini" color="red" className="public-card-delete" onClick={()=>{setConfirmOpen(true)}}>
                <Icon name="trash"/>
            </Button>
            <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePost}/>
        </>
        : ''

    return button;
}

const DELETE_TASK_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`

export default DeleteButton;