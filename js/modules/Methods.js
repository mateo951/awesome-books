import Book from './Book.js';
import Books from './Books.js';

export default class Methods {
  static createBook(bookData) {
    const newBook = new Book(bookData.title, bookData.author);
    Books.getBooks().push(newBook);
    this.insertBookStructure(newBook, false);
  }

  static removeBook(div) {
    const removeBttn = document.getElementById(div.id).querySelector('.removeButton');
    removeBttn.addEventListener('click', () => {
      this.rearrangeIds(div);
      Books.getBooks().splice(div.id, 1); // eslint-disable-next-line no-use-before-define
      this.CheckInput();
      div.remove();
    });
  }

  static rearrangeIds(div) {
    if (div.id !== Books.getBooks().length) {
      for (let i = parseInt(div.id, 10); i < Books.getBooks().length - 1; i += 1) {
        const newDiv = document.getElementById(i + 1);
        newDiv.id = i;
      }
    }
  }

  static insertBookStructure(book, initialDisplay) {
    const listItem = document.createElement('li');
    listItem.innerHTML = ` ${book.title}`
      + ' by '
      + `${book.author}`
      + ' '
      + "<button class = 'removeButton'>Remove</button><br>";
    if (!initialDisplay) {
      listItem.id = `${Books.getBooks().length - 1}`;
    } else {
      listItem.id = `${Books.ids}`;
      Books.ids += 1;
    }
    document.querySelector('#booksDisplay ul').appendChild(listItem);
    this.removeBook(listItem);
  }

  static localStorageAv() {
    const test = 'test';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  static CheckInput() {
    const storageAvailability = this.localStorageAv();
    if (storageAvailability) {
      this.HandleInputData();
    }
  }

  static HandleInputData() {
    const jsonData = JSON.stringify(Books.getBooks());
    localStorage.setItem('data', jsonData);
  }
}
