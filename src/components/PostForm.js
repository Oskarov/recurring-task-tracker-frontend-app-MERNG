import React from 'react';
import {Form, Button} from "semantic-ui-react";
import {useForm} from "../util/hooks";

const importanceOptions = [
    {key: '0', text: 'Обыденная', value: 0},
    {key: '1', text: 'Значимая', value: 1},
    {key: '2', text: 'Критичная', value: 2},
]

const repetitionOptions = [
    {key: '0', text: 'Раз в диапазон времени', value: 0},
    {key: '1', text: 'Не меньше раза в период', value: 1},
]

const onSubmit = () => {

};

const PostForm = (props) => {
    const savePost = () => {

    }

    const {values, onChange} = useForm(savePost, {
        body: '',
        isPrivate: true,
        importance: 0,
        color: '#000000',
        flag: '',
        repetitionType: 0,
        repetitionRange: 7,
    });


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

export default PostForm;