import Book from './modules/Book.js';
import Books from './modules/Books.js';
import Methods from './modules/Methods.js';

const form = document.querySelector('#submitBttn');

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
    Methods.CheckInput();
    inputs[0].value = "";
    inputs[1].value = "";
    event.preventDefault();

  }
});

function CheckLocalInput() {
  const data = JSON.parse(localStorage.getItem('data'));
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
