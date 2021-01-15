import React, {useContext, useEffect} from 'react';
import {Grid, Transition} from "semantic-ui-react";
import PublicPost from "../components/PublicPost";
import {useQuery} from "@apollo/react-hooks";
import {AuthContext} from "../context/auth";
import gql from "graphql-tag";

const MyTasks = (props) => {
    const {user} = useContext(AuthContext);
    const {loading, data} = useQuery(FETCH_MY_POSTS_QUERY, {variables:user});
    let posts = !!data ? data.getUserPosts: '';

    useEffect(() => {
        if (typeof data !== 'undefined'){
            posts = !!data ? data.getPosts: '';
        }
    }, [data]);

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
                                    <PublicPost post={post}/>
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
            username
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