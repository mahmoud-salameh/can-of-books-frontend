import React, { Component } from 'react'
import Book from './Book';
import { withAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import BestBooks from './BestBooks';
import CreateForm from './CreateForm';
import UpdateForm from './UpdateForm';

export class profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.auth0.user.name,
            userEmail: this.props.auth0.user.email,
            userPicture: this.props.auth0.user.picture,
            serverUrl: process.env.REACT_APP_SERVER_URL,
            bookData: [],
            bookName: '',
            bookNameUpdate: '',
            showUpdateForm: false,
            bookIndex: 0,


        }
    }


    componentDidMount = () => {
        axios.get(`${this.state.serverUrl}/books?email=${this.state.userEmail}`).then(response => {
            this.setState({
                bookData: response.data.books
            })
        }).catch(
            error => {
                alert(error.message);
            }
        );
    }


    updateBookName = (bookName) => this.setState({ bookName });

    updateBookNameUpdateForm = (bookName) => this.setState = ({ bookNameUpdate: bookName });

    showUpdateForm = (bookObject, idx) =>this.setState = ({ showUpdateForm: !this.state.showUpdateForm, bookNameUpdate: bookObject.name, bookIndex: idx })

    createMyBook = (e) => {
        e.preventDefault();

        const reqBody = {
            bookName: this.state.bookName,
            userEmail: this.state.userEmail
        }
        axios.post(`${this.state.serverUrl}/book`, reqBody).then(responce => {
            this.setState({
                bookData: responce.data.books
            })
        }).catch(error =>
            alert(error.message)
        )



    }

    updateMyBook = (e) => {
        e.preventDefault();
        const reqBody = {
            bookName: this.state.bookNameUpdate,
            userEmail: this.state.userEmail
        }
        axios.put(`${this.state.serverUrl}/book`, reqBody).then(responce => {
            this.setState({
                bookData: responce.data.books
            })
        }).catch(error =>
            alert(error.message)
        )
    }

    deleteMyBook = (index) => {
        axios.delete(`${this.state.serverUrl}/book/${index}?email=${this.state.userEmail}`).then(response => {
            this.setState({
                bookData: response.data.books,
                showUpdateForm: false
            });
        }).catch(Error =>
            alert(Error.message)
        )
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

                <div>
                    <CreateForm
                        updateBookName={this.updateBookName}
                        createMyBook={this.createMyBook}
                    />
                </div>
                {this.state.showUpdateForm &&
                    <div>
                        <UpdateForm
                            updateMyBook={this.updateMyBook}
                            updateBookNameUpdateForm={this.updateBookNameUpdateForm}
                            bookNameUpdate={this.state.bookNameUpdate}
                        />
                    </div>

                }
                {
                    this.state.bookData.length > 0 &&
                    <div>
                        <Book

                            bookData={this.state.bookData}
                            deleteMyBook={this.deleteMyBook}
                            showUpdateForm= {this.showUpdateForm}
                        />
                    </div>
                }

                {this.state.bookData.length > 0 &&
                    <div>
                        <BestBooks
                            bookData={this.state.bookData}
                        />
                    </div>
                }



            </div>
        )
    }
}

export default withAuth0(profile)