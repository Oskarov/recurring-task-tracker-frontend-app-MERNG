import React, {useContext} from 'react';
import {Grid} from "semantic-ui-react";
import PrivatePost from "../components/PrivatePost";
import {useQuery} from "@apollo/react-hooks";
import {AuthContext} from "../context/auth";
import gql from "graphql-tag";

const MyTasks = () => {
    const {user} = useContext(AuthContext);
    const {loading, data} = useQuery(FETCH_MY_POSTS_QUERY, {variables:user});
    let posts = !!data ? data.getUserPosts: '';


    return (
        <div>
            <h3>Мои задачи</h3>

            <Grid columns={3}>
                <Grid.Row>
                    {loading ? (
                        <div>
                            <h2>Загрузка записей</h2>
                        </div>
                    ) : (
                            posts && posts.map(post => (
                                <Grid.Column key={post.id} style={{marginBottom: 20}}>
                                    <PrivatePost post={post}/>
                                </Grid.Column>
                            ))

                    )}
                </Grid.Row>
            </Grid>
        </div>
    );
}

export const FETCH_MY_POSTS_QUERY = gql`
    query getUserPosts( 
        $username: String!
    ){
        getUserPosts(
            username: $username
        ){
            id
            body
            createdAt
            updatedAt
            isPrivate
            username
            importance
            flag
            color
            repetitionType
            repetitionRange
            likesCount
            likes {
                username
            }
            commentsCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`

export default MyTasks;