import React from 'react';
import PropTypes from 'prop-types';

import RequestEntry from './requestentry';
import RequestField from './requestfield';

import 'Style/element/api/request.scss';

export const renderFields = data => {
    const fields = [];
    var label = '',
        i = 0;

    for(label in data) {
        fields.push(<RequestField key={i} label={label} value={ data[label] }/>);
        i++;
    }

    return fields;
}

class Request extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
        const { delay, isSuccess, json, query} = this.props;
        const titleClass = isSuccess ? 'success' : 'error';
        const bodyClass = ['body'];

        if(!this.state.isShow) {
            bodyClass.push('body--hidden');
        }

        var content = '',
            type = 'Object';

        if(Array.isArray(json)) {
            type = 'Array(' + json.length + ')';

            content = json.slice(0, 5).map(
                (data, i) => <RequestEntry key={i} data={data}/>
            );
        }
        else {
            content = renderFields(json);
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
                <div className={bodyClass.join(' ')}>
                    <p className='type'>{type}</p>
                    {content}
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
