const booksDisplaySection = document.querySelector("#booksDisplay");
const form = document.querySelector("#submitBttn");

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

const Methods = class {
  static createBook(bookData) {
    const newBook = new Book(bookData.title, bookData.author);
    books.booksData.push(newBook);
    this.insertBookStructure(newBook, false);
  }

  static removeBook(div) {
    const removeBttn = document
      .getElementById(div.id)
      .querySelector(".removeButton");
    removeBttn.addEventListener("click", () => {
      books.booksData.splice(div.id, 1); // eslint-disable-next-line no-use-before-define
      CheckInput();
      div.remove();
    });
  }

  static insertBookStructure(book, initialDisplay) {
    const divSection = document.createElement("div");
    divSection.innerHTML =
      `<p>${book.title}</p>` +
      `<p>${book.author}</p>` +
      "<button class = 'removeButton'>Remove</button><br>";
    if (!initialDisplay) {
      divSection.id = `${books.booksData.length - 1}`;
    } else {
      divSection.id = `${Books.ids}`;
      Books.ids += 1;
    }
    booksDisplaySection.appendChild(divSection);
    this.removeBook(divSection);
  }
};

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
  const jsonData = JSON.stringify(books.booksData);
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
