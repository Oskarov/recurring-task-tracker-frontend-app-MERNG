import React, {useContext, useState} from 'react';
import {AuthContext} from "../context/auth";
import {useMutation} from '@apollo/react-hooks'
import gql from "graphql-tag";
import {useForm} from "../util/hooks";
import {Button, Form} from "semantic-ui-react";

const AddComment = ({postId}) => {
    const {user} = useContext(AuthContext);

    let component = '';

    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(addCommentToMutation, {
        body: ''
    });

    const [addComment] = useMutation(ADD_COMMENT_MUTATION, {
        variables: {...values, postId},
        update(proxy, {data: {login: userData}}) {
            onChange('', {name: 'body', value: ''});
            setErrors({});
        },
        onError(ApolloError) {
            if (ApolloError.graphQLErrors[0].extensions.exception.error != 'wrong credentials'){
                transferErrors(ApolloError.graphQLErrors[0].extensions.exception.errors);
            }
        }

    })

    const transferErrors = (errors) => {
        let errorObj = {}
        for (const [key, value] of Object.entries(errors)) {
            errorObj[key] = {
                error: {
                    content: value,
                }
            }
        }
        setErrors(errorObj);
    }

    function addCommentToMutation(){
        addComment();
    }

    const focusBehavior = () => {
        setErrors({});
    }


    if (!user){
        component = <p>Только зарегистрированные пользователи могут оставлять комментарии</p>
    } else {


        component = <>
            <Form onSubmit={onSubmit} noValidate>
                <Form.TextArea
                    {...errors.body}
                    name="body"
                    rows="2"
                    label="body"
                    placeholder="Введите комментарий..."
                    value={values.body}
                    onChange={onChange}
                    onFocus={focusBehavior}
                />
                <Button type="submit" primary>
                    Отправить
                </Button>
            </Form>
        </>
    }

    return component;
}

const ADD_COMMENT_MUTATION = gql`
    mutation(
        $postId: ID!
        $body: String!
    ){
        createComment(
            postId: $postId
            body: $body
        ){
            id
            comments{
                id
                body
                createdAt
                username
            }
            commentsCount
        }
    }
`;



export default AddComment;
