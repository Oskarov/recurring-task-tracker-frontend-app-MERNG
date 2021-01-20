import React, {useState, useEffect, useContext} from 'react'
import {Button, Icon, Label, Menu} from "semantic-ui-react";
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {AuthContext} from "../context/auth";
import {Link} from "react-router-dom";


const LikeButton = ({likesCount, likes, id}) => {

    const {user} = useContext(AuthContext);

    const [liked, setLiked] = useState(false)

    useEffect(() => {
        setLiked(user && likes.find(like => like.username == user.username))
    }, [user, liked])

    const likePost = () => {

    }

    const heart = liked ? <Icon name='heart'/> : <Icon name='heart outline'/>;

    return <Button as='div' labelPosition='right' size="mini">
        {user &&
            <Button color='red' size="mini" onClick={likePost}>
                {heart}
                Лайки
            </Button>
        }
        {!user &&
            <Button color='red' size="mini" as={Link} to="/login">
                <Icon name='heart outline'/>
            </Button>
        }

        <Label as='a' basic pointing='left'>
            {likesCount}
        </Label>
    </Button>
}

const LIKE_TASK_MUTATION = gql`
`

export default LikeButton