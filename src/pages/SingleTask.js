import React, {useState} from 'react'
import gql from "graphql-tag";
import {useQuery} from '@apollo/react-hooks';

const SingleTask = (props) => {

    const [post, setPost] = useState({});

    const postId = props.match.params.postId;
    const {data} = useQuery(FEATCH_TASK_QUERY, {
        variables: {
            postId
        },
        update(proxy, {data}) {
           setPost(data.getPost);
        },
    });

    let postMarkup;
    if (!post) {
        postMarkup = <p>Загрузка...</p>
    } else {
       const {id, body, createdAt, updatedAt, username} = post;
    }
    return(
        <div>
            {postMarkup}
        </div>
    )
}

export default SingleTask;

const FEATCH_TASK_QUERY = gql`
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