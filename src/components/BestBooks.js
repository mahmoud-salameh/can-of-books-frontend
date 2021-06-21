import React from 'react';
import axios from 'axios';

const componentDidMount = () => {
    axios.get(`${this.state.serverUrl}/cats?email=${this.state.userEmail}`).then(response => {
        this.setState({
            catsData: response.data[0].cats
        })
    }).catch(
        error => {
            alert(error.message);
        }
    );
}

export default componentDidMount;