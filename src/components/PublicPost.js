import React from 'react';
import {Card, Icon, Label, Image, Button} from "semantic-ui-react";
import moment from "moment";
import {Link} from "react-router-dom";

const PublicPost= ({post: { body, id, username, importance, color, flag, repetitionType, repetitionRange, createdAt, updatedAt, failures, successes, comments, commentsCount, likes, likesCount}}) => {

    const likePost = () => {

    }

    const commentPost = () => {

    }
    
    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <Card.Description as={Link} to={`/posts/${id}`}>
                    {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Card.Meta>
                    <Button as='div' labelPosition='right' size="mini">
                        <Button color='red' size="mini" onClick={likePost}>
                            <Icon name='heart' />
                             Лайки
                        </Button>
                        <Label as='a' basic pointing='left'>
                            {likesCount}
                        </Label>
                    </Button>
                    <Button as='div' labelPosition='right' size="mini">
                        <Button color='blue' size="mini" onClick={commentPost}>
                            <Icon name='comments' />
                             Комментарии
                        </Button>
                        <Label as='a' basic pointing='left'>
                            {commentsCount}
                        </Label>
                    </Button>

                </Card.Meta>
            </Card.Content>
        </Card>
    );
};

export default PublicPost;
