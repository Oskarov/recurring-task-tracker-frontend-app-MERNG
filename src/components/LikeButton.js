import React, {useState, useEffect, useContext} from 'react'
import {Button, Icon, Label, Menu} from "semantic-ui-react";
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {AuthContext} from "../context/auth";
import {Link} from "react-router-dom";


const LikeButton = ({likesCount, likes, id, username}) => {

    const {user} = useContext(AuthContext);

    const [liked, setLiked] = useState(false)

    const [likePost] = useMutation(LIKE_TASK_MUTATION, {
        update() {
            setLiked(!liked);
        },
        variables: {postId: id}
    });

    const heart = liked ? <Icon name='heart'/> : <Icon name='heart outline'/>;

    return <Button as='div' labelPosition='right' size="mini">

        {(user && (user.username != username))
            ? <Button color='red' size="mini" onClick={likePost}>
                {heart}
                Лайки
            </Button>
            : <Button color='red' size="mini" as={Link} to="/login">
                <Icon name='heart outline'/>
            </Button>
        }

        <Label as='a' basic pointing='left'>
            {likesCount}
        </Label>
    </Button>
}

const LIKE_TASK_MUTATION = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id
            likes{
                id username
            }
            likesCount
        }
    }
`

export default LikeButton