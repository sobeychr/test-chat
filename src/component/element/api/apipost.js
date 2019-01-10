import React from 'react';

import 'Style/element/api/apipost.scss';

class ApiPost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                alpha: 1,
                beta: 2,
                gamma: 3,
            },
            isShow: true
        };

        this.handleShow = this.handleShow.bind(this);
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
            rows.push(
                <tr key={i}>
                    <td>
                        <input type='text' value={label}/>
                    </td>
                    <td>
                        <input type='text' value={ data[label] }/>
                    </td>
                </tr>
            );
            i++;
        }

        return (
            <div className='api-post'>
                <p className='api-post__title' onClick={this.handleShow}>Post content</p>
                <button className='api-post__add' type='button'>Add entry</button>
                <table className={bodyClass.join(' ')}>
                    {rows}
                </table>
            </div>
        );
    }
}

export default ApiPost;
