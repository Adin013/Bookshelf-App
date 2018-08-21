import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookShelf from "./BookShelf";


class BookList extends React.Component {
  state = {};

  //This will filter the books based on a shelf
  ReArrangeShelf = (bookId, event) => {
    //books are taken from shelf in the app
    let currentBooks = this.props.currentBooks;
    const book = currentBooks.filter(book => book.id === bookId)[0];
    book.shelf = event.target.value;
    BooksAPI.update(book, event.target.value).then(response => {
      this.setState({
        books: currentBooks
      });
    });
  };

  render() {
    return (
      // List of books, List of titles and their contents
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf
            key="currentlyReading"
            books={this.props.currentBooks.filter(book => book.shelf === "currentlyReading")}
            ReArrangeShelf={this.ReArrangeShelf}
            shelfTitle="HotShelf"
          />
          <BookShelf
            key="wantToRead"
            books={this.props.currentBooks.filter(book => book.shelf === "wantToRead")}
            ReArrangeShelf={this.ReArrangeShelf}
            shelfTitle="WaitingShelf"
          />
          <BookShelf
            key="read"
            books={this.props.currentBooks.filter(book => book.shelf === "read")}
            ReArrangeShelf={this.ReArrangeShelf}
            shelfTitle="FinishedShelf"
          />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>                                                                                               
        </div>
      </div>
    );
  }
}
export default BookList;