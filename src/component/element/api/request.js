import React from 'react';
import PropTypes from 'prop-types';

import 'Style/element/api/request.scss';

const renderFields = data => {
    const fields = [];
    var key = '',
        i = 0;

    for(key in data) {
        fields.push(<p key={i}>
            <span className='title'>{key}:</span>
            <span className='value'>{data[key]}</span>
        </p>);
        i++;
    }

    return fields;
}

class Request extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bodyHeight: 0,
            isShow: true
        };

        this.handleShow = this.handleShow.bind(this);
    }

    componentDidMount() {
        this.setState({
            bodyHeight: this.bodyRef.clientHeight
        });
    }

    handleShow() {
        this.setState({
            isShow: !this.state.isShow
        });
    }

    render() {
        const { delay, isSuccess, json, query} = this.props;
        const titleClass = isSuccess ? 'success' : 'error';

        var bodyAttr = {
                className: 'body',
                style: {
                    height: this.state.bodyHeight > 0 ? this.state.bodyHeight : '100%'
                },
                ref: (bodyEl) => (this.bodyRef = bodyEl)
            },
            fields = [],
            type = '';

        if(!this.state.isShow) {
            bodyAttr.className += ' body--hidden';
        }

        if(Array.isArray(json)) {
            type = 'Array(' + json.length + ')';
            fields = json.slice(0, 4).map(
                    (data, i) => (
                        <div key={i}>
                            <p className='entry'>Entry</p>
                            { renderFields(data) }
                        </div>
                    )
                );
        }
        else {
            type = 'Object';
            console.log(json);

            //fields = renderFields(json);
        }
           
        return (
            <article className='request'>
                <header className='header'>
                    <h1 className={titleClass} onClick={this.handleShow}>REQUEST</h1>
                    <span className='query'>{'/' + query}</span>
                    <p className='delay'>
                        <span className='int'>{delay}</span>ms
                    </p>
                </header>
                <div {...bodyAttr}>
                    <p class='title'>
                        <span className='title'>Type:</span>
                        <span className='value string'>{type}</span>
                    </p>
                    {fields}
                </div>
            </article>
        );
    }
}

export default Request;

Request.propTypes = {
    delay: PropTypes.number.isRequired,
    isSuccess: PropTypes.bool,
    json: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object
        ]).isRequired,
    query: PropTypes.string.isRequired
};
Request.defaultProps = {
    isSuccess: false
};
