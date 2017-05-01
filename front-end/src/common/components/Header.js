import React, {Component} from "react";
import {NavLink, withRouter} from "react-router-dom";
import {connect} from "react-redux";


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuIsOpen: false,
            headerIsWhite: this.props.location.pathname === '/'
        }
    }

    handlerMenuClick() {
        this.setState({menuIsOpen: !this.state.menuIsOpen});
    }

    componentDidUpdate() {

        this.isAdmin = this.props.user.data && this.props.user.data.role == 1;
        this.isSponsor = this.props.user.data && this.props.user.data.role != 1;
        this.isNotSign= !this.props.user.data;

        if (this.state.headerIsWhite !== (this.props.location.pathname === '/')) {
            this.setState({
                headerIsWhite: this.props.location.pathname === '/'
            });
        }
    }

    render() {
        return (
            <div>
                <div className={`overlay large-0" ${this.state.menuIsOpen ? "" : "hide"}`}>
                    <h1 className="inline medium-0 large-0 m-t-1">Меню </h1>
                    <div className="menu-btn-icon right"
                         onClick={this.handlerMenuClick.bind(this)}/>
                    <button className="overlay-btn" to="">Сделать вклад</button>
                    <button className="overlay-btn" to="">Войти</button>
                    <div className="small-navigation no-padding" onClick={this.handlerMenuClick.bind(this)}>
                        <NavLink className="small-nav-item" to="/about">О фонде</NavLink>
                        <NavLink className="small-nav-item" to="/projects">Проекты</NavLink>
                        <NavLink className="small-nav-item" to="/sponsors">Благотворители</NavLink>
                        <NavLink className="small-nav-item" to="/alumni">Клуб выпускников</NavLink>
                        <NavLink className="small-nav-item" to="/news">Новости</NavLink>
                        <NavLink className="small-nav-item" to="/contacts">Контакты</NavLink>
                    </div>
                </div>
                <header>
                    <NavLink to="/"
                             activeClassName="selected">
                        <div className={`logo${this.state.headerIsWhite ? "-white" : ""}`}/>
                    </NavLink>
                    {this.isAdmin && 
                     <NavLink className={`login-btn-icon${this.state.headerIsWhite ? "-white" : ""} small-0 medium-0`}
                            to='/admin'/>
                    }
                    {this.isSponsor&& 
                     <NavLink className={`login-btn-icon${this.state.headerIsWhite ? "-white" : ""} small-0 medium-0`}
                            to='/'/>
                    }
                    {this.isNotSign  && 
                     <NavLink className={`login-btn-icon${this.state.headerIsWhite ? "-white" : ""} small-0 medium-0`}
                            to='/projects'/>
                    }
                   
                    <div className={`menu-btn-icon${this.state.headerIsWhite ? "-white" : ""} large-0`}
                         onClick={this.handlerMenuClick.bind(this)}/>
                    <NavLink className={`donate-btn${this.state.headerIsWhite ? "-white" : ""} small-0 medium-0`} to='/projects'>Сделать вклад</NavLink>
                    <div className={`navigation${this.state.headerIsWhite ? "-white" : ""} small-0 medium-0`}>
                        <NavLink className="nav-item" to="/about">О фонде</NavLink>
                        <NavLink className="nav-item" to="/projects">Проекты</NavLink>
                        <NavLink className="nav-item" to="/sponsors">Благотворители</NavLink>
                        <NavLink className="nav-item" to="/alumni">Клуб выпускников</NavLink>
                        <NavLink className="nav-item" to="/news">Новости</NavLink>
                        <NavLink className="nav-item" to="/contacts">Контакты</NavLink>
                    </div>
                </header>
            </div>
        );
    }
}


export default Header;
