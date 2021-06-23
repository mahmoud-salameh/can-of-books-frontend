import React, { Component } from 'react'

export class Book extends Component {
    render() {
        return (
            <div>
                <>
                    <h2>My Books</h2>
                    {this.props.bookData.length && this.props.bookData.map((book, idx) => (
                        <div key={idx}>
                            {book.name}
                            <button onClick={e => this.props.deleteMyBook(idx)} >Delete Book</button>
                            <button onClick={e => this.props.showUpdateForm(book, idx)} >Show Update Form</button>
                        </div>
                    ))}
                </>
            </div>
        )
    }
}

export default Book
