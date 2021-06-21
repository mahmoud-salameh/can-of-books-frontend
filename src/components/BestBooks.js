import React from 'react'

export class BestBooks extends React.Component {
    render() {
        return (
            <>
                <h2>My favorite books</h2>
                {this.props.bookData.length && this.props.bookData.map((book, idx) => (
                    <div key={idx}>
                        {book.name}
                    </div>
                ))}
            </>
        )
    }
}

export default BestBooks