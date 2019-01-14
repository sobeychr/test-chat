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
            <div className='api-post-entry'>
                <div className='api-post-entry__label'>
                    <input type='text' value={label} className='api-post-entry__input' placeholder='label' onChange={this.handleLabel}/>
                </div>
                <div className='api-post-entry__value'>
                    <input type='text' value={value} className='api-post-entry__input' placeholder='value' onChange={this.handleValue}/>
                </div>
            </div>
        );
    }
}

export default ApiPost;
