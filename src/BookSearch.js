import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BookSearch extends React.Component {

  constructor() {
    super();
    this.state = {
    query: "",
    books: []
    }
  }

  // Updates Data
  RecreateData = (books) => {
    const ChecksBooks = books.map(book => {
      book.shelf = "none";
      this.props.currentBooks.forEach(book2 => {
        if (book.id === book2.id) {
          book.shelf = book2.shelf;
        }
      })
      return book
    })
    this.setState({
      books: ChecksBooks
    })
  }


  // Updates Query
  RecreateQuery = (query) => {
    this.setState({ query: query })
    if (query) {
      BooksAPI.search(query, 25).then((books) => {
        if( books.length > 0){
          return this.RecreateData(books);
        }else{
          return this.setState({books:[]});
        }
      })
    }
    else
    {this.setState({books:[]})} 
  }

  RecreateBooks = (book, shelf)=> {
    const bookToUpdate = this.state.books.filter(ChecksBook => ChecksBook.id === book.id)[0];
    bookToUpdate.shelf = shelf;
    this.setState({
      books: this.state.books
    })
    this.props.ReArrangeShelf(book, shelf);
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.RecreateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.filter((book) => (book.imageLinks)).map(book =>
              <li key={book.id} className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: book.imageLinks ? (`url(${book.imageLinks.thumbnail})`) : (`url(https://dummyimage.com/128x170/4f4f4f/ffffff.jpg&text=No+Book+Art)`) 
                    }}
                  />
                  <div className="book-shelf-changer">
                    <select
                      value={book.shelf}
                      onChange={e => {
                        this.RecreateBooks(book, e.target.value);
                      }}
                    >
                      <option disabled>
                        Move to...
                      </option>
                      <option value="currentlyReading">HotShelf</option>
                      <option value="wantToRead">WaitingShelf</option>
                      <option value="read">FinishedShelf</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">
                  {book.title}
                </div>
                {book.authors &&
                  <div className="book-authors">
                    {Array.isArray(book.authors) ? book.authors.join(', '): ''}
                  </div>}
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}
export default BookSearch;