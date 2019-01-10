import React from 'react';

import ApiPostEntry from './apipostentry';

import 'Style/element/api/apipost.scss';

class ApiPost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isShow: true
        };

        this.handleAdd  = this.handleAdd.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    handleAdd() {
        var data = this.state.data;
        data.push({
            label: '',
            value: ''
        });
        this.setState(data);
    }

    handleShow() {
        this.setState({
            isShow: !this.state.isShow
        });
    }

    render() {
        const bodyClass = ['api-post__body'];
        const data = this.state.data;
        const rows = [];

        if(!this.state.isShow) {
            bodyClass.push('api-post__body--hidden');
        }

        var label = '',
            i = 0;
        for(label in data) {
            rows.push(<ApiPostEntry key={i} {...data[label]} />);
            i++;
        }

        return (
            <div className='api-post'>
                <div className='api-post__title'>
                    <span onClick={this.handleShow}>Post content</span>
                    <button className='api-post__add' type='button' onClick={this.handleAdd}>Add entry</button>
                </div>
                <table className={bodyClass.join(' ')}>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ApiPost;
