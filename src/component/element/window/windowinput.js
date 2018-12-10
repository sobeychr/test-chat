import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { newMessage } from './../../../reduxStore/actions';

import './../../../style/element/window/windowinput.scss';

class WindowInput extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            message: ''
        };
    }

    onChange(event) {
        this.setState({
            message: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.dispatch(newMessage(
                this.props.id,
                this.state.message
            ));
        this.setState({
            message: ''
        });
    }

    render() {
        return (
            <form acceptCharset="UTF-8" action="" autoComplete="off" className="windowinput" encType="text/plain" noValidate onSubmit={this.onSubmit}>
                <input type="text" name="wi_input" className="windowinput__input" placeholder="message..." value={this.state.message} onChange={this.onChange}/>
                <button name="wi_submit" type="submit" className="windowinput__submit"/>
            </form>
        );
    }
};

export default connect()(WindowInput);

WindowInput.defaultProps = {
};
WindowInput.propTypes = {
    id: PropTypes.number.isRequired
};
