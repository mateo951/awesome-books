const booksDisplaySection = document.querySelector("#booksDisplay");
const form = document.querySelector("#submitBttn");

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Books {
  static ids = 0;
  static booksData = [];

  constructor() {
    this.booksData = [];
  }

  static initializeBooks(data) {
    this.booksData = data;
  }

  static getBooks() {
    return this.booksData;
  }
}

class Methods {
  static createBook(bookData) {
    const newBook = new Book(bookData.title, bookData.author);

    Books.getBooks().push(newBook);
    this.insertBookStructure(newBook, false);
  }

  static removeBook(div) {
    const removeBttn = document
      .getElementById(div.id)
      .querySelector(".removeButton");
    removeBttn.addEventListener("click", () => {
      Books.getBooks().splice(div.id, 1); // eslint-disable-next-line no-use-before-define
      CheckInput();
      div.remove();
    });
  }

  static insertBookStructure(book, initialDisplay) {
    const listItem = document.createElement("li");
    if (Books.ids % 2 === 0) {
      listItem.classList.add("dark-bg");
    } else {
      listItem.classList.add("white-bg");
    }
    listItem.innerHTML =
      ` ${book.title}` +
      " by " +
      `${book.author}` +
      " " +
      "<button class = 'removeButton'>Remove</button><br>";
    if (!initialDisplay) {
      listItem.id = `${Books.getBooks().length - 1}`;
    } else {
      listItem.id = `${Books.ids}`;
      Books.ids += 1;
    }
    document.querySelector("#booksDisplay ul").appendChild(listItem);
    this.removeBook(listItem);
  }
}

function localStorageAv() {
  const test = "test";
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

function HandleInputData() {
  const jsonData = JSON.stringify(Books.getBooks());
  localStorage.setItem("data", jsonData);
}

const storageAvailability = localStorageAv();

const CheckInput = () => {
  if (storageAvailability) {
    HandleInputData();
  }
};

function hasValue(input) {
  if (input === "") {
    return false;
  }
  return true;
}

form.addEventListener("click", (event) => {
  const inputs = document.querySelectorAll("#bookForm input[type='text']");
  const titleValue = inputs[0].value;
  const authorValue = inputs[1].value;
  if (hasValue(titleValue) && hasValue(authorValue)) {
    const book = new Book(titleValue, authorValue);
    Methods.createBook(book);
    CheckInput();
    event.preventDefault();
  }
});

function CheckLocalInput() {
  const data = JSON.parse(localStorage.getItem("data"));
  if (data !== null) {
    Books.initializeBooks(data);
    for (let i = 0; i < data.length; i += 1) {
      if (hasValue(data[i])) {
        Methods.insertBookStructure(data[i], true);
      }
    }
  }
}

CheckLocalInput();
/* eslint max-classes-per-file: off */
