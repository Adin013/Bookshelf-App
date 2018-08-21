import React from 'react';
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookSearch from "./BookSearch";
import BookList from "./BookList";
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [] 
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
     this.RecreateData(books)
     })
  }

  // Shelf will be updated
  ReArrangeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      let newBook = book
      newBook.shelf = shelf
      // remove book from state
      // add the updated book to state
      this.setState((prevState) => ({ books: prevState.books.filter(b => b.id !== book.id).concat(newBook) }))
      })
  }

  RecreateData = () => {
    BooksAPI.getAll().then(data => {
            this.setState({
              books: data
            })
    });    
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <BookList currentBooks={this.state.books} />} />
        <Route
        path="/search"
        render={() =>
        <BookSearch ReArrangeShelf={this.ReArrangeShelf} currentBooks={this.state.books} />}/>
      </div>
    );
  }
}

export default BooksApp
