const booksDisplaySection = document.querySelector('#booksDisplay');
const form = document.querySelector('#submitBttn');

const Book = class {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
};

const Books = class {
  static ids = 0;

  constructor() {
    this.booksData = [];
  }

  initializeBooks(data) {
    this.booksData = data;
  }
};

const books = new Books();



function localStorageAv() {
  const test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

function HandleInputData() {
  const jsonData = JSON.stringify(books.booksData);
  localStorage.setItem('data', jsonData);
}

const storageAvailability = localStorageAv();

const CheckInput = () => {
  if (storageAvailability) {
    HandleInputData();
  }
};

function hasValue(input) {
  if (input === '') {
    return false;
  }
  return true;
}

form.addEventListener('click', (event) => {
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
  const data = JSON.parse(localStorage.getItem('data'));
  if (data !== null) {
    books.initializeBooks(data);
    for (let i = 0; i < data.length; i += 1) {
      if (hasValue(data[i])) {
        Methods.insertBookStructure(data[i], true);
      }
    }
  }
}

CheckLocalInput();
/* eslint max-classes-per-file: off */