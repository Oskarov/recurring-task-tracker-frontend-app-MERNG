import React, {useState} from 'react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks'
import {Form, Button} from "semantic-ui-react";
import {useForm} from "../util/hooks";

function Login(props) {

    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUser, {
        username: '',
        password: '',
    })


    const [login, {loading}] = useMutation(LOGIN_USER, {
        update(proxy, result) {
            props.history.push('/');
        },
        variables: values,
        onError(ApolloError) {
            console.log(ApolloError.graphQLErrors[0]);
            if (ApolloError.graphQLErrors[0].extensions.exception.error != 'wrong credentials'){
                transferErrors(ApolloError.graphQLErrors[0].extensions.exception.errors);
            } else {
                setErrors({fatalError: 'wrong credentials'});
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

    function loginUser(){
        login();
    }


    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Войти</h1>
                <Form.Input
                    {...errors.username}
                    label="Username"
                    placeholder="user1990"
                    name="username"
                    value={values.username}
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
                {errors.fatalError && (
                    <div className="ui icon message">
                        <i className="stop circle outline icon red"></i>
                        <div className="content">
                            <div className="header">
                                Неправильный логин или пароль.
                            </div>
                            <p>Попробуйте ещё раз или зарегистрируйтесь.</p>
                        </div>
                    </div>
                )}
                <Button type="submit" primary>
                    Войти
                </Button>
            </Form>
        </div>
    );
}

const LOGIN_USER = gql`
    mutation login (
        $username: String!
        $password: String!
    ) {
        login (
            username: $username
            password: $password
        ){
            id
            email
            username
            createdAt
            token
        }
    }
`

export default Login;