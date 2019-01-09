import React from 'react';

import Request from 'Element/api/request';

import 'Style/page/api.scss';

const rootUrl = 'http://localhost:3300';

class Api extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            query: '',
            responses: []
        };

        this.handleQuery       = this.handleQuery.bind(this);
        this.handleQuerySubmit = this.handleQuerySubmit.bind(this);
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

        const start = new Date().getTime();
        this.setState({
            loading: true,
            query: ''
        });

        
        fetch(rootUrl + query)
            .then(response => response.json())
            .then(json => {
                const end = new Date().getTime();
                let responses = this.state.responses;

                responses.push({
                    end,
                    error: false,
                    json,
                    query,
                    start
                });
                this.setState({
                    loading: false,
                    responses
                });
            })
            .catch(err => {
                const end = new Date().getTime();
                let responses = this.state.responses;

                responses.push({
                    end,
                    error: true,
                    json: {},
                    query,
                    start
                });
                this.setState({
                    loading: false,
                    responses
                });
            });
    }

    render() {
        const requestList = this.state.responses.reverse().map(
                (data, i) => <Request key={i} {...data}/>
            );

        let submitButton = '';
        if(!this.state.loading) {
            submitButton = <button className='submit' type='submit'>Submit</button>;
        }

        return (
            <div className='main'>
                <form className='form' onSubmit={this.handleQuerySubmit}>
                    <input className='input' type='text' placeholder='/api/request' value={this.state.query} onChange={this.handleQuery} />
                    {submitButton}           
                </form>

                <section className='list'>{requestList}</section>
            </div>
        );
    }
}

export default Api;
