import React, {useState} from 'react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks'
import {Form, Button} from "semantic-ui-react";

function Register(props) {

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmedPassword: ''
    });


    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            console.log(result);
        },
        variables: values,
        onError(ApolloError) {
            console.log(ApolloError);
        }
    })

    const onSubmit = (e) => {
        e.preventDefault();
        addUser();
    }

    const onChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate>
                <h1>Регистрация</h1>
                <Form.Input
                    label="Nickname"
                    placeholder="user1990"
                    name="username"
                    value={values.username}
                    onChange={onChange}
                />
                <Form.Input
                    label="Email"
                    placeholder="user1990@1990.com"
                    name="email"
                    value={values.email}
                    onChange={onChange}
                />
                <Form.Input
                    label="Пароль"
                    placeholder="********"
                    name="password"
                    value={values.password}
                    onChange={onChange}
                    type="password"
                />
                <Form.Input
                    label="Подтвердите пароль"
                    placeholder="********"
                    name="confirmedPassword"
                    value={values.confirmedPassword}
                    onChange={onChange}
                    type="password"
                />
                <Button type="submit" primary>
                    Зарегистрироваться
                </Button>
            </Form>
        </div>
    );
}

const REGISTER_USER = gql`
    mutation register (
        $username: String!
        $email: String!
        $password: String!
        $confirmedPassword: String!
    ) {
        register ( registerInput: {
            username: $username
            email: $email
            password: $password
            confirmedPassword: $confirmedPassword
        }
        ){
            id
            email
            username
            createdAt
            token
        }
    }
`

export default Register;