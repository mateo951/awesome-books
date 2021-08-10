let booksArray = [];
const Book = function (title, author) {
  this.title = title;
  this.author = author;
};
const booksDisplaySection = document.querySelector('#booksDisplay');
const form = document.querySelector('#submitBttn');
let ids = 0;

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

const storageAvailability = localStorageAv();

function HandleInputData() {
  const jsonData = JSON.stringify(booksArray);
  localStorage.setItem('books', jsonData);
}

const CheckInput = () => { // eslint-disable-line no-unused-vars
  if (storageAvailability) {
    HandleInputData();
  }
};

const removeBook = function (div) {
  const removeBttn = document.getElementById(div.id).querySelector('.removeButton');
  removeBttn.addEventListener('click', () => {
    booksArray.splice(div.id, 1);
    CheckInput();
    div.remove();
  });
};

const insertBookStructure = function (book, initialDisplay) {
  const divSection = document.createElement('div');
  divSection.innerHTML = `<p>${book.title}</p>`
    + `<p>${book.author}</p>`
    + '<button class = \'removeButton\'>Remove</button><br>';
  if (!initialDisplay) {
    divSection.id = `${booksArray.length - 1}`;
  } else {
    divSection.id = `${ids}`;
    ids += 1;
  }

  booksDisplaySection.appendChild(divSection);
  removeBook(divSection);
};

const createBook = function (titleValue, authorValue) {
  const newBook = new Book(titleValue, authorValue);
  booksArray.push(newBook);
  insertBookStructure(newBook, false);
};

form.addEventListener('click', (event) => {
  const inputs = document.querySelectorAll("#bookForm input[type='text']");
  const titleValue = inputs[0].value;
  const authorValue = inputs[1].value;
  createBook(titleValue, authorValue);
  CheckInput();
  event.preventDefault();
});

const initializeBooks = function (data) {
  if (data.length > 0) {
    booksArray = data;
  }
};

function hasValue(input) {
  if (input === '') {
    return false;
  }
  return true;
}

function CheckLocalInput() {
  const data = JSON.parse(localStorage.getItem('books'));
  if (data !== null) {
    initializeBooks(data);
    ids = 0;
    for (let i = 0; i < data.length; i += 1) {
      if (hasValue(data[i])) {
        insertBookStructure(data[i], true);
      }
    }
  }
}

CheckLocalInput();
