import React, {useContext} from 'react';
import {Card, Icon, Label, Image, Button} from "semantic-ui-react";
import moment from "moment";
import {Link} from "react-router-dom";
import {AuthContext} from "../context/auth";
import LikeButton from "./LikeButton";

const PublicPost = ({post: {body, id, username, importance, color, flag, repetitionType, repetitionRange, createdAt, updatedAt, failures, successes, comments, commentsCount, likes, likesCount}}) => {

    const {user} = useContext(AuthContext);
    const currentUserName = !!user ? user.username : '';

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
                {currentUserName != username &&
                <Card.Meta>
                    <LikeButton likesCount={likesCount} likes={likes} id={id}  username={username}/>
                    <Button as='div' labelPosition='right' size="mini">
                        <Button color='blue' size="mini" as={Link} to={`/posts/${id}`}>
                            <Icon name='comments'/>
                            Комментарии
                        </Button>
                        <Label as='a' basic pointing='left'>
                            {commentsCount}
                        </Label>
                    </Button>
                </Card.Meta>
                }
                {currentUserName == username &&
                <Card.Meta >
                    <div className="public-card-cont">
                        <div>
                            <Button as='div' labelPosition='right' size="mini" disabled>
                                <Button size="mini">
                                    <Icon name='heart'/>
                                    Лайки
                                </Button>
                                <Label as='a' basic pointing='left'>
                                    {likesCount}
                                </Label>
                            </Button>
                            <Button as='div' labelPosition='right' size="mini" disabled>
                                <Button size="mini" as={Link} to={`/task/${id}`}>
                                    <Icon name='comments'/>
                                    Комментарии
                                </Button>
                                <Label as='a' basic pointing='left'>
                                    {commentsCount}
                                </Label>
                            </Button>
                        </div>
                        <Button as='div' size="mini" color="red" className="public-card-delete">
                            <Icon name="trash"/>
                        </Button>
                    </div>

                </Card.Meta>
                }
            </Card.Content>
        </Card>
    );
};

export default PublicPost;
