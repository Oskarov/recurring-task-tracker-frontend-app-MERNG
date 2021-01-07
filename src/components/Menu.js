import React, {useContext, useState} from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import {Link} from "react-router-dom";
import {AuthContext} from "../context/auth";

function MenuBar(){

    const {user, logout} = useContext(AuthContext);

    const pathname = window.location.pathname;
    let path = '';
    switch (pathname) {
        case 'login':
            path = 'login';
            break;
        case 'register':
            path = 'register';
            break;
        default:
            path = 'home';
    }

    const [activeItem, setActiveItem] = useState('path');
    const handleItemClick = (e, { name }) => setActiveItem(name);

    const menuBar = user ? (
        <Menu pointing secondary color="teal" size="massive">
            <Menu.Item
                name={user.username}
                active
                as={Link}
                to="/"
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    name='logout'
                    onClick={logout}
                />
            </Menu.Menu>
        </Menu>
    ) : (
        <Menu pointing secondary color="teal" size="massive">
            <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={handleItemClick}
                as={Link}
                to="/"
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    name='login'
                    active={activeItem === 'login'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/login"
                />
                <Menu.Item
                    name='register'
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

export default MenuBar;
