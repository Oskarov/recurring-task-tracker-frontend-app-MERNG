import React, {useState, useEffect, useContext} from 'react'
import {Button, Icon, Label} from "semantic-ui-react";
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {AuthContext} from "../context/auth";


const LikeButton = ({likesCount, likes, id}) => {

    const {user} = useContext(AuthContext);

    const [liked, setLiked] = useState(false)

    useEffect(() => {
        setLiked(user && likes.find(like => like.username == user.username))
    }, [user, liked])

    const likePost = () => {

    }


    return <Button as='div' labelPosition='right' size="mini">
        <Button color='red' size="mini" onClick={likePost}>
            {liked &&
            <Icon name='heart'/>
            }
            {!liked &&
            <Icon name='heart outline'/>
            }
            Лайки
        </Button>
        <Label as='a' basic pointing='left'>
            {likesCount}
        </Label>
    </Button>
}

export default LikeButton