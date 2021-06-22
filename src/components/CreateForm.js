import React, { Component } from 'react'


export class CreateForm extends Component {
    render() {
        return (
            <div>
                <form onSubmit={(e) => this.props.createMyBook(e)}>
                    <lable>Book Name</lable>
                    <input onChange={(e) => this.props.updateBookName(e.target.value)}></input>
                    <input type='submit' value="create book" />
                </form>
            </div>
        )
    }
}

export default CreateForm
