import React from 'react'
import gql from "graphql-tag";
import {useQuery} from '@apollo/react-hooks';

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
       const {id, body, createdAt, updatedAt, username} = data.getPost;
       postMarkup = <div>
           {createdAt}{body}
       </div>
    }


    return(
        <div className="1245678">
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