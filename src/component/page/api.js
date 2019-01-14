import React from 'react';

import ApiPost from 'Element/api/apipost';
import Request from 'Element/api/request';

import 'Style/page/api.scss';

const getTimestamp = () => new Date().getTime();

const predefQuery = [
    'message/new',

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

        responses.unshift({
            delay: getTimestamp() - this.state.start,
            isSuccess,
            json,
            query: this.state.query
        });

        this.setState({
            loading: false,
            responses,
            start: 0
        });
    }

    handleQuery(event) {
        this.setState({
            query: event.target.value
        });
    }

    handleQuerySubmit(isPost) {
        let query = this.state.query;
        if(query.substr(0,1) !== '/') {
            query = '/' + query;
        }

        this.setState({
            loading: true,
            start: getTimestamp(),
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

        const requestList = this.state.responses.map(
                (data, i) => <Request key={i} {...data}/>
            );

        const submitButton = this.state.loading
            ? <span className='loading'>Loading</span>
            : <div>
                <button className='submit' type='button' onClick={() => {this.handleQuerySubmit(false);}}>GET</button>
                <button className='submit' type='button' onClick={() => {this.handleQuerySubmit(true);}}>POST</button>
            </div>;
        
        return (
            <main className='main'>
                <form className='form'>
                    <input className='input' type='text' list='predefQuery' placeholder='/api/request' readOnly={this.state.loading ? 'readonly' : ''} value={this.state.query} onChange={this.handleQuery} />

                    <datalist id='predefQuery'>{queryList}</datalist>
                    {submitButton}

                    <ApiPost />
                </form>

                <section className='list'>{requestList}</section>
            </main>
        );
    }
}

export default Api;
