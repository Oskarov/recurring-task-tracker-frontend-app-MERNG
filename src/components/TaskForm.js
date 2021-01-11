import React, {useState} from 'react';
import {Form, Button} from "semantic-ui-react";
import {useForm} from "../util/hooks";
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks'

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

    const [createTask, { error }] = useMutation(CREATE_TASK_MUTATION, {
        variables: values,
        update(_, result){
            console.log(result);
        },
        onError(ApolloError) {
            console.log(ApolloError);
                transferErrors(ApolloError);
        }
    });

   function savePost(){
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
                name="body"
                label="Задача"
                placeholder="сделать очередной шаг"
                onChange={onChange}
                value={values.body}
            />
            <Form.Group inline onChange={onChange}>
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
                fluid
                label='Важность'
                name="importance"
                value={values.importance}
                onChange={onChange}
                options={importanceOptions}
                placeholder='Обыденная важность'
            />
            <Form.Select
                fluid
                name="repetitionType"
                label='Тип повторений'
                value={values.repetitionType}
                onChange={onChange}
                options={repetitionOptions}
                placeholder='Как сичтать повторения?'
            />
            <Form.Field
                label='Диапазон повторений в днях'
                placeholder='1'
                control='input'
                name="repetitionRange"
                value={values.repetitionRange}
                onChange={onChange}
                type='number'
                max={365}/>
            <Form.Input
                name="color"
                label="Цвет"
                value={values.color}
                onChange={onChange}
                placeholder="#ffffff"
            />
            <Form.Input
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

const CREATE_TASK_MUTATION = gql`
    mutation createPost(
        $body: String!
        $isPrivate: Boolean
        $importance: Int
        $color: String
        $flag: String
        $repetitionType: Int
        $repetitionRange: Int
    ){
        createPost( postInput: {
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
        }
    }
`

export default TaskForm;