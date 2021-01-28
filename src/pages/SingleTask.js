import React from 'react'
import gql from "graphql-tag";
import moment from "moment";
import {useQuery} from '@apollo/react-hooks';
import {Card, Grid, Image} from "semantic-ui-react";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

const SingleTask = (props) => {


    const postId = props.match.params.postId;
    const {loading, data} = useQuery(FETCH_TASK_QUERY, {
        variables: {
            postId
        },
        onError(ApolloError) {
            console.log(ApolloError);
        }
    });

    let postMarkup;
    if (loading) {
        postMarkup = <p>Загрузка...</p>
    } else {
        const {id, body, createdAt, updatedAt, username, likesCount, likes} = data.getPost;
        postMarkup = <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <Card fluid>
                            <Card.Content>
                                <Image
                                    src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                                    size="mini"
                                    floated='left'/>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(updatedAt).fromNow()}</Card.Meta>
                            </Card.Content>
                        </Card>
                        <h1>{body}</h1>
                        <hr/>
                        <LikeButton likesCount={likesCount} likes={likes} id={id} username={username}/>
                        <hr/>
                        <DeleteButton username={username} id={id} callback={()=>props.history.push('/')}/>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        1245678
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    }


    return (
        <div>
            {postMarkup}
        </div>
    )
}

export default SingleTask;

const FETCH_TASK_QUERY = gql`
    query($postId: ID!){
        getPost(postId: $postId){
            id
            body
            createdAt
            updatedAt
            isPrivate
            importance
            color
            flag
            repetitionType
            repetitionRange
            username
            likesCount
            likes{
                username
            }
            commentsCount
            comments{
                id
                body
                username
                createdAt
            }
        }
    }
`