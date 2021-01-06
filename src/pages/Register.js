import React, {useState} from 'react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks'
import {Form, Button} from "semantic-ui-react";
import {useForm} from "../util/hooks";

function Register(props) {

    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmedPassword: ''
    })

    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            props.history.push('/');
        },
        variables: values,
        onError(ApolloError) {
            transferErrors(ApolloError.graphQLErrors[0].extensions.exception.errors);
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

    function registerUser(){
        addUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Регистрация</h1>
                <Form.Input
                    {...errors.username}
                    label="Username"
                    placeholder="user1990"
                    name="username"
                    value={values.username}
                    onChange={onChange}
                />
                <Form.Input
                    {...errors.email}
                    label="Email"
                    placeholder="user1990@1990.com"
                    name="email"
                    value={values.email}
                    onChange={onChange}
                />
                <Form.Input
                    {...errors.password}
                    label="Пароль"
                    placeholder="********"
                    name="password"
                    value={values.password}
                    onChange={onChange}
                    type="password"
                />
                <Form.Input
                    {...errors.confirmedPassword}
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