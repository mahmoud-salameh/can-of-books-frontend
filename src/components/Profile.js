import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import BestBooks from "./BestBooks";
import axios from "axios";
import CreateForm from "./CreateForm";
import Button from "react-bootstrap/Button";
import UpdateForm from "./UpdateForm";
export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.auth0.user.name,
      userPicture: this.props.auth0.user.picture,
      userEmail: this.props.auth0.user.email,
      serverUrl: process.env.REACT_APP_SERVER_URL,
      bookData: [],
      bookName: "",
      description: "",
      status: "",
      flagAddBook: false,
      showUpdateForm: false,
      bookIndex: 0,
    };
  }

  bookIndex = (indexBook) => {
   
    this.setState({
      bookIndex: indexBook,
      showUpdateForm: !this.state.showUpdateForm,
    });
  };

  flagAddBook = () => {
    this.setState({
      flagAddBook: !this.state.flagAddBook,
    });
  };


  UpdateForm = (e) => {
   
   e.preventDefault();
   try{
   
    const reqBody = {
      userEmail: this.state.userEmail,
      bookName: this.state.bookName,
      description: this.state.description,
      status: this.state.status
    };

    axios
      .put(`${this.state.serverUrl}/book/${this.state.bookIndex}`, reqBody)
      .then((response) => {
        this.setState({
          bookData: response.data.books,
          showUpdateForm: !this.state.showUpdateForm,
        });
      });
    } catch(error){
    }
  
    };

  updateBookName = (bookName) => {
    this.setState({
      bookName: bookName,
    });
  };

  updatdescription = (desc) => {
    this.setState({
      description: desc,
    });
  };
  statusBook = (stateBook) => {
    this.setState({
      status: stateBook,
    });
  };

  createBook = (e) => {
    e.preventDefault();
    const reqBody = {
      userEmail: this.state.userEmail,
      bookName: this.state.bookName,
      description: this.state.description,
      status: this.state.status,
    };
    axios.post(`${this.state.serverUrl}/book`, reqBody).then((response) => {
      this.setState({
        bookData: response.data.books,
        flagAddBook: !this.state.flagAddBook,
      });
    });
  };

  componentDidMount = () => {
    axios
      .get(`${this.state.serverUrl}/books?email=${this.state.userEmail}`)
      .then((response) => {
        console.log("axios", response.data.books);
        this.setState({
          bookData: response.data.books,
        });

        console.log("response", response);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  deleteBook = (index) => {

    
    axios
      .delete(
        `${this.state.serverUrl}/book/${index}?email=${this.state.userEmail}`
      )
      .then((response) => {
        this.setState({
          bookData: response.data.books,
        });
      });
  };

  render() {
    return (
      <div>
        <h2> {this.state.username} </h2>
        <p> {this.state.userEmail} </p>
        <img src={this.state.userPicture} alt={this.state.username} />
        <Button onClick={this.flagAddBook}>{this.state.flagAddBook ? 'Cancel' : 'Add New Book'   }</Button>
        {this.state.flagAddBook && (
          <CreateForm
            updatBookName={this.updateBookName}
            updatdescription={this.updatdescription}
            statusBook={this.statusBook}
            createBook={this.createBook}
          />
        )}

        {
          <BestBooks
          
            bookData={this.state.bookData}
            deleteBook={this.deleteBook}
            bookIndex={this.bookIndex}
          />
        }
{ this.state.showUpdateForm &&
        <UpdateForm 
            updatBookName={this.updateBookName}
            updatdescription={this.updatdescription}
            statusBook={this.statusBook}
            UpdateForm={this.UpdateForm}
        
        />


}
      </div>
    );
  }
}

export default withAuth0(Profile)