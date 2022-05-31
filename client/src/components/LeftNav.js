import React from 'react';
import {NavLink} from "react-router-dom";

const LeftNav = () => {
    return (
        <div className="left-nav-container">
            <div className="icons">
                <div className="icons-bis">
                    <NavLink to='/' activeClassName="active-left-nav">
                        <img src="./img/icons/home.svg" alt="home"/>
                    </NavLink>
                    <NavLink to='/trending' activeClassName="active-left-nav">
                        <img src="./img/icons/rocket.svg" alt="trending"/>
                    </NavLink>
                    <NavLink to='/profil' activeClassName="active-left-nav">
                        <img src="./img/icons/user.svg" alt="profil"/>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default LeftNav;