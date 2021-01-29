import React, {useContext, useState} from 'react';
import {AuthContext} from "../context/auth";
import {Button, Card, Confirm, Icon} from "semantic-ui-react";
import moment from "moment";
import gql from "graphql-tag";
import {useMutation} from "@apollo/react-hooks";

const CommentCard = ({comment, postId}) => {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const {user} = useContext(AuthContext);

    let deleteCommentButton = '';

    const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
        variables: {postId, commentId: comment.id},
        update(proxy) {
            setConfirmOpen(false);
            const cData = proxy.readQuery({
                query: FETCH_TASK_QUERY, variables: {
                    postId
                }
            });
            console.log(cData);
            cData.getPost.comments = cData.getPost.comments.filter(c => c.id !== comment.id );
            proxy.writeQuery({query: FETCH_TASK_QUERY, variables: {postId},  data: { cData }});
        }
    })

    if (user && user.username == comment.username){
        deleteCommentButton = <>
            <>
                <Button as='div' size="mini" className="comment-delete" onClick={() => {
                    setConfirmOpen(true)
                }}>
                    <Icon name="close"/>
                </Button>
                <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deleteComment}/>
            </>
        </>
    }


    return <Card fluid key={comment.id}>
        <Card.Content>
            {deleteCommentButton}
            <Card.Header>{comment.username}</Card.Header>
            <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
            <Card.Description>{comment.body}</Card.Description>
        </Card.Content>
    </Card>
}

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment(
        $postId: ID!,
        $commentId: ID!
    ){
        deleteComment(
            postId: $postId,
            commentId: $commentId
        ){
            commentsCount
        }
    }
`

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

export default CommentCard;