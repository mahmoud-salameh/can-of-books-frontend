import React from 'react'


export class BestBooks extends React.Component {
    
    render() {
        return (
            <>
                <h2>My favorite books</h2>
                {this.props.bookData.length && this.props.bookData.map((book, idx) => (
                    <div key={idx}>
                        <h2>{book.name}</h2>
                        <h4> {book.description}</h4>
                        <p> {book.status}</p>
                    </div>
                ))}
            </>
        )
    }
}

export default BestBooks