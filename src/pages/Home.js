import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {Grid, Transition} from "semantic-ui-react";
import PublicPost from "../components/PublicPost";
import { FETCH_POSTS_QUERY} from "../util/graphql";

function Home(props) {
    const {loading, data} = useQuery(FETCH_POSTS_QUERY);
    let posts = !!data ? data.getPosts : [];
    console.log(data);

    return (
        <div>
            <h3>Последние задачи</h3>

            <Grid columns={3}>
                <Grid.Row>
                    {loading ? (
                        <div>
                            <h2>Загрузка записей</h2>
                        </div>
                    ) : (
                        <Transition.Group>
                            {posts && posts.map(post => (
                            <Grid.Column key={post.id} style={{marginBottom: 20}}>
                                <PublicPost post={post} history={props.history}/>
                            </Grid.Column>
                            ))}
                        </Transition.Group>

                    )}
                </Grid.Row>
            </Grid>
        </div>
    );
}

export default Home;