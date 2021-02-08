import React, {useState, useEffect} from 'react';
import {Form, Button} from "semantic-ui-react";
import {useForm} from "../util/hooks";
import {useMutation, useQuery} from '@apollo/react-hooks'
import {CREATE_TASK_MUTATION, FETCH_POSTS_QUERY} from "../util/graphql";
import gql from "graphql-tag";

const importanceOptions = [
    {key: '0', text: 'Обыденная', value: 0},
    {key: '1', text: 'Значимая', value: 1},
    {key: '2', text: 'Критичная', value: 2},
]

const repetitionOptions = [
    {key: '0', text: 'Раз в диапазон времени', value: 0},
    {key: '1', text: 'Не меньше раза в период', value: 1},
]

const TaskForm = (props) => {
    const postId = props.postId || null;

    const {values, onChange, onSubmit, changeBunchValues} = useForm(savePost, {
        body: '',
        isPrivate: true,
        importance: 0,
        color: '#000000',
        flag: '',
        repetitionType: 0,
        repetitionRange: 7,
    });

    const {loading, data} = useQuery(FETCH_TASK_QUERY, {
        variables: {
            postId
        },
        skip: !postId
    });

    useEffect(() => {
        if (!loading && !!data) {
            changeBunchValues(data.getPost);
        }
    }, [data]);

    const [errors, setErrors] = useState({});

    const [createTask] = useMutation(CREATE_TASK_MUTATION, {
        variables: values,
        update(proxy, result) {
            const cache = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            cache.getPosts = [result.data.createPost, ...cache.getPosts];
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: cache
            });
            props.history.push('/');
        },
        onError(ApolloError) {
            transferErrors(ApolloError.graphQLErrors[0].extensions.exception.errors);
        }
    });

    const [editTask] = useMutation(EDIT_TASK_MUTATION, {
        variables: {...values, postId},
        update(proxy, result) {
            const cache = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            cache.getPosts = [...cache.getPosts, result.data.editPost];
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: cache
            });
            props.history.push('/');
        },
        onError(ApolloError) {
            transferErrors(ApolloError.graphQLErrors[0].extensions.exception.errors);
        }
    });

    function savePost() {
        if (!postId) {
            createTask();
        } else {
            editTask();
        }
    }

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


    return (
        <Form onSubmit={onSubmit}>
            <Form.Input
                {...errors.body}
                name="body"
                label="Задача"
                placeholder="сделать очередной шаг"
                onChange={onChange}
                value={values.body}
            />
            <Form.Group inline>
                <label>Статус</label>
                <Form.Radio
                    name="isPrivate"
                    label="Приватная"
                    value={true}
                    onChange={onChange}
                    checked={values.isPrivate}
                />
                <Form.Radio
                    name="isPrivate"
                    label="Публичная"
                    value={false}
                    onChange={onChange}
                    checked={!values.isPrivate}
                />
            </Form.Group>
            <Form.Select
                {...errors.importance}
                fluid
                label='Важность'
                name="importance"
                value={values.importance}
                onChange={onChange}
                options={importanceOptions}
                placeholder='Обыденная важность'
            />
            <Form.Select
                {...errors.repetitionType}
                fluid
                name="repetitionType"
                label='Тип повторений'
                value={values.repetitionType}
                onChange={onChange}
                options={repetitionOptions}
                placeholder='Как сичтать повторения?'
            />
            <Form.Field
                {...errors.repetitionRange}
                label='Диапазон повторений в днях'
                placeholder='1'
                control='input'
                name="repetitionRange"
                value={values.repetitionRange}
                onChange={onChange}
                type='number'
                max={365}/>
            <Form.Input
                {...errors.color}
                name="color"
                label="Цвет"
                value={values.color}
                onChange={onChange}
                placeholder="#ffffff"
            />
            <Form.Input
                {...errors.flag}
                name="flag"
                label="Тег"
                value={values.flag}
                onChange={onChange}
                placeholder="тег"
            />
            <Form.Button color="teal" type="submit">Создать задачу</Form.Button>
        </Form>
    )
}

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

export const EDIT_TASK_MUTATION =  gql`
    mutation editPost(
        $postId: ID!
        $body: String!
        $isPrivate: Boolean
        $importance: Int
        $color: String
        $flag: String
        $repetitionType: Int
        $repetitionRange: Int
    ){
        editPost(
            postId: $postId
            postInput: {
                body: $body
                isPrivate: $isPrivate
                importance: $importance
                color: $color
                flag: $flag
                repetitionType: $repetitionType
                repetitionRange: $repetitionRange
            }
        ){
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



export default TaskForm;