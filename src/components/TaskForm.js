import React, {useState} from 'react';
import {Form, Button} from "semantic-ui-react";
import {useForm} from "../util/hooks";
import {useMutation} from '@apollo/react-hooks'
import {CREATE_TASK_MUTATION, FETCH_POSTS_QUERY} from "../util/graphql";

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
    const {values, onChange, onSubmit} = useForm(savePost, {
        body: '',
        isPrivate: true,
        importance: 0,
        color: '#000000',
        flag: '',
        repetitionType: 0,
        repetitionRange: 7,
    });

    const [errors, setErrors] = useState({});

    const [createTask, {error}] = useMutation(CREATE_TASK_MUTATION, {
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
            console.log(ApolloError.graphQLErrors[0]);
            transferErrors(ApolloError.graphQLErrors[0].extensions.exception.errors);
        }
    });

    function savePost() {
        createTask();
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
            <Form.Group {...errors.isPrivate} inline onChange={onChange}>
                <label>Статус</label>
                <Form.Radio
                    name="isPrivate"
                    label="Приватная"
                    value={true}
                    onChange={onChange}
                    checked={values.isPrivate == true ? true : false}
                />
                <Form.Radio
                    name="isPrivate"
                    label="Публичная"
                    value={false}
                    onChange={onChange}
                    checked={values.isPrivate == false ? true : false}
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
            <Button color="teal" type="submit">Создать пост</Button>
        </Form>
    )
}

export default TaskForm;