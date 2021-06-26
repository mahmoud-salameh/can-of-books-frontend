import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
export class BestBooks extends Component {
    render() {
        return (
            <div>
                <h2>My Favorite Books</h2>
                {this.props.bookData.length && this.props.bookData.map((book,idx) => (
                    <div key={idx}>
                        {book.name +'  ' +book.description +' '+book.status}
                        <Button onClick={(e)=> this.props.deleteBook(idx) }>Remove</Button>
                        <Button onClick={(e) => this.props.bookIndex(idx)} >Update</Button>
                    </div>
                ))}
                      </div>
        )
    }
}

export default BestBooks;