import React from "react";

class BookShelf extends React.Component {
  state = {};

  render() {
  // show the books in the shelves
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {this.props.shelfTitle}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.filter((book)=>(book.imageLinks)).map(book =>
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
                    <select value={book.shelf} onChange={event => this.props.ReArrangeShelf(book.id, event)}>
                      <option value="none" disabled>
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
                <div className="book-authors">
                  {book.authors &&
                    <div className="book-authors">
                      {Array.isArray(book.authors) ? book.authors.join(', '): ''}
                    </div>}
                </div>
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}
export default BookShelf;