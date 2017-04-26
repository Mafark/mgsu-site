import React, {Component} from "react";
import {Link} from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <header>
                <div className="logo-white"/>
                <div className="login-btn-icon-white"/>
                <div className="donate-btn-white">Сделать вклад</div>
                <ul className="navigation">
                    <li className="nav-item">Новости</li>
                    <li className="nav-item">О фонде</li>
                    <li className="nav-item">Контакты</li>
                    <li className="nav-item">Проекты</li>
                    <li className="nav-item">Благотворители</li>
                    <li className="nav-item">Клуб выпускников</li>
                </ul>
            </header>
        );
    }
}


export default Header;
