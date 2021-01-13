import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {Grid} from "semantic-ui-react";
import PublicPost from "../components/PublicPost";
import { FETCH_POSTS_QUERY} from "../util/graphql";

function Home(props) {
    const {loading, data} = useQuery(FETCH_POSTS_QUERY);
    const posts = !!data ? data.getPosts: '';
    return (
        <div>
            <h3>Последние записи</h3>

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

export default Home;