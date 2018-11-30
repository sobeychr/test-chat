import React from 'react';
import { connect } from 'react-redux';

import WindowChat from './../element/window/windowchat';
import { fetchUsers } from './../../reduxStore/actions';

import './../../style/page/index.scss';

class Index extends React.Component {
    componentDidMount() {
        this.props.dispatch( fetchUsers() );
        console.log( this.props );
    }

    render() {
        const userData = [];
        const users = userData.map(
                (data, i) => <WindowChat key={i} {...data}/>
            );

        //{users}
        return (
            <div className="main">
                
            </div>
        );
    }
}

const mapStateToProp = state => ({
    userData: state
});

export default connect(mapStateToProp)(Index);
