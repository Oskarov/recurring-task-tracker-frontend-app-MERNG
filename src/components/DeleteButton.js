import React, {useContext, useState} from 'react'
import {Button, Icon, Confirm} from "semantic-ui-react";
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {AuthContext} from "../context/auth";
import {Link} from "react-router-dom";
import {FETCH_POSTS_QUERY} from "../util/graphql";


const DeleteButton = ({id, username, callback}) => {

    const [confirmOpen, setConfirmOpen] = useState(false);

    const [deletePost] = useMutation(DELETE_TASK_MUTATION, {
        variables: {postId: id},
        update(proxy) {
            setConfirmOpen(false);
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })
            data.getPosts = data.getPosts.filter(p => p.id !== id);
            proxy.writeQuery({query: FETCH_POSTS_QUERY, data});
            if (callback) callback();
        }
    })

    const {user} = useContext(AuthContext);
    const name = !!user ? user.username : '';

    const button = name == username ?
        <>
            <Button as='div' size="mini" color="red" className="public-card-delete" onClick={() => {
                setConfirmOpen(true)
            }}>
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