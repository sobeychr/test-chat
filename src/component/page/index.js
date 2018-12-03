import React from 'react';
import { connect } from 'react-redux';

import WindowChat from './../element/window/windowchat';
import { fetchUsers } from './../../reduxStore/actions';

import './../../style/page/index.scss';

class Index extends React.Component {
    componentDidMount() {
        this.props.dispatch( fetchUsers() );
    }

    render() {
        const users = this.props.userData.map(
                (data, i) => <WindowChat key={i} {...data}/>
            );

        return (
            <div className="main">
                {users}
            </div>
        );
    }
}

const mapStateToProp = state => ({
    userData: state.user
});

export default connect(mapStateToProp)(Index);
