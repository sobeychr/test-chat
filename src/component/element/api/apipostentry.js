import React from 'react';

import 'Style/element/api/apipostentry.scss';

class ApiPost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: this.props.label,
            value: this.props.value,
        };

        this.handleLabel = this.handleLabel.bind(this);
        this.handleValue = this.handleValue.bind(this);
    }

    handleLabel() {
        this.setState({
            label: event.target.value
        });
    }

    handleValue(event) {
        this.setState({
            value: event.target.value
        });
    }

    render() {
        const {label, value} = this.state;

        return (
            <tr>
                <td>
                    <input type='text' value={label} onChange={this.handleLabel}/>
                </td>
                <td>
                    <input type='text' value={value} onChange={this.handleValue}/>
                </td>
            </tr>
        );
    }
}

export default ApiPost;
