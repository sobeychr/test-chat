import React from 'react';

import Request from 'Element/api/request';

import 'Style/page/api.scss';

const getTimestamp = () => new Date().getTime();

const predefQuery = [
    'message/after',
    'message/before',
    'message/between',
    'message/from',
    'message/has',
    'message/list',

    'user/list',
    'user/offline',
    'user/online',
];
const rootUrl = 'http://localhost:3300';

class Api extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            query: '',
            responses: [],
            start: 0
        };

        this.completeResponse  = this.completeResponse.bind(this);
        this.handleQuery       = this.handleQuery.bind(this);
        this.handleQuerySubmit = this.handleQuerySubmit.bind(this);
    }

    completeResponse(isSuccess=false, json={}) {
        let responses = this.state.responses;

        responses.push({
            delay: getTimestamp() - this.state.start,
            isSuccess,
            json,
            query: this.state.query
        });

        this.setState({
            loading: false,
            query: '',
            responses,
            start: 0
        });
    }

    handleQuery(event) {
        this.setState({
            query: event.target.value
        });
    }

    handleQuerySubmit(event) {
        event.preventDefault();

        let query = this.state.query;
        if(query.substr(0,1) !== '/') {
            query = '/' + query;
        }

        this.setState({
            loading: true,
            start: getTimestamp(),
            status: 0,
            statusText: ''
        });

        fetch(rootUrl + query)
            .then(response => response.json())
            .then(json => {
                this.completeResponse(true, json);
            })
            .catch(err => {
                this.completeResponse(false);
            });
    }

    render() {
        const queryList = predefQuery.map(
                (data, i) => <option key={i} value={data}/>
            );

        const requestList = this.state.responses.reverse().map(
                (data, i) => <Request key={i} {...data}/>
            );

        const submitButton = this.state.loading
            ? <span className='loading'>Loading</span>
            : <button className='submit' type='submit'>Submit</button>;
        
        return (
            <main className='main'>
                <form className='form' onSubmit={this.handleQuerySubmit}>
                    <input className='input' type='text' list='predefQuery' placeholder='/api/request' readOnly={this.state.loading ? 'readonly' : ''} value={this.state.query} onChange={this.handleQuery} />

                    <datalist id='predefQuery'>{queryList}</datalist>

                    <div>{submitButton}</div>
                </form>

                <section className='list'>{requestList}</section>
            </main>
        );
    }
}

export default Api;
