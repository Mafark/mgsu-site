import React, { Component, PropTypes } from 'react'
import {Route, Switch} from "react-router";
import AdminAccount from "./components/AdminAccount";
import FormsSection from "./components/FormsSection";


const propTypes = {}

const defaultProps = {}

class AdminSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <Switch>
                <Route exact path={`${this.props.match.url}/`} component={AdminAccount}/>
                <Route  path={`${this.props.match.url}/forms`} component={FormsSection}/>
            </Switch>
        )
    }
}

AdminSection.propTypes = propTypes

AdminSection.defaultProps = defaultProps

export default AdminSection
