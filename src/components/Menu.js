import React, {useContext, useState, useEffect} from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import {Link} from "react-router-dom";
import {AuthContext} from "../context/auth";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";

function MenuBar(){

    const {user, login, logout} = useContext(AuthContext);

    const {data, error} = useQuery(GET_USER);

    useEffect(() => {
        if (typeof data !== 'undefined'){
            login(data.getUser);
        }
    }, [data]);
    
    const pathname = window.location.pathname;
    let path = '';

    switch (pathname) {
        case '/login':
            path = 'login';
            break;
        case '/register':
            path = 'register';
            break;
        case '/new-task':
            path = 'newTask';
            break;
        case '/my-tasks':
            path = 'myTasks';
            break;
        default:
            path = 'home';
    }

    const [activeItem, setActiveItem] = useState(path);
    const handleItemClick = (e, { menuName }) => setActiveItem(menuName);

    const menuBar = user ? (
        <Menu pointing secondary color="teal" size="massive">
            <Menu.Item
                name={user.username}
                active
                menuName='home'
                as={Link}
                onClick={handleItemClick}
                to="/"
            />
            <Menu.Item
                name='Мои задачи'
                menuName='myTasks'
                active={activeItem === 'myTasks'}
                onClick={handleItemClick}
                as={Link}
                to="/my-tasks"
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    name='Добавить задачу'
                    menuName='newTask'
                    active={activeItem === 'newTask'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/new-task"
                />
                <Menu.Item
                    name='logout'
                    onClick={logout}
                />
            </Menu.Menu>
        </Menu>
    ) : (
        <Menu pointing secondary color="teal" size="massive">
            <Menu.Item
                name='Главная'
                menuName='home'
                active={activeItem === 'home'}
                onClick={handleItemClick}
                as={Link}
                to="/"
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    name='Войти'
                    menuName='login'
                    active={activeItem === 'login'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/login"
                />
                <Menu.Item
                    name='Зарегистрироваться'
                    menuName='register'
                    active={activeItem === 'register'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/register"
                />
            </Menu.Menu>
        </Menu>
    );

    return menuBar;
}

const GET_USER = gql`
    query{
        getUser{
            id
            username
            email
            token
            createdAt
        }
    }
`

export default MenuBar;
