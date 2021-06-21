import React, { Component } from 'react'

export class FavBooks extends Component {
    render() {
        return (
            <>
            <h2>My Cats</h2>
            {this.props.books.length && this.props.books.map((book, idx) => (
                <div key={idx}>
                    {book.name}
                </div>
                  ))}
                  </>
        )
    }
}

export default FavBooks
