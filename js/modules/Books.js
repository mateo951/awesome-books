export default class Books {
  static ids = 0;

  static booksData = [];

  static initializeBooks(data) {
    this.booksData = data;
  }

  static getBooks() {
    return this.booksData;
  }
}

