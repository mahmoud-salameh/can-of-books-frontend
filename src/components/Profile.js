import React, { Component } from 'react'
import { withAuth0 } from "@auth0/auth0-react";
import BestBooks from './BestBooks';
import axios from 'axios';

export class profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.auth0.user.name,
            userEmail: this.props.auth0.user.email,
            userPicture: this.props.auth0.user.picture,
            serverUrl: process.env.REACT_APP_SERVER_URL,
            bookData: []
        }
    }

    componentDidMount = () => {
        axios.get(`${this.state.serverUrl}/books?email=${this.state.userEmail}`).then(response => {
            this.setState({
              bookData: response.data[0].books
            })
        }).catch(
           error  => {
                alert(error.message);
            }
        );
    }
  



    render() {
        // console.log(this.props.auth0);
        return (
          <div>
                <div>
                    <h2>{this.state.userName}</h2>
                    <p>{this.state.userEmail}</p>
                    <img src={this.state.userPicture} alt={this.state.userName} />
                </div>
                {this.state.bookData.length > 0 &&
                    <div>
                        <BestBooks
                            BestBooks={this.state.bookData}
                        />
                    </div>
                }
            </div>
        )
    }
}

export default withAuth0(profile)