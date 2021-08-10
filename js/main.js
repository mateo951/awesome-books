let booksArray = [];
let Book = function (title, author) {
  this.title = title;
  this.author = author;
};
let booksDisplaySection = document.querySelector("#booksDisplay");
let form = document.querySelector("#submitBttn");

form.addEventListener("click", (event) => {
  let inputs = document.querySelectorAll("#bookForm input[type='text']");
  let titleValue = inputs[0].value;
  let authorValue = inputs[1].value;
  createBook(titleValue, authorValue);
  CheckInput();
});

let createBook = function (titleValue, authorValue) {
  let newBook = new Book(titleValue, authorValue);
  booksArray.push(newBook);
  insertBookStructure(newBook);
}

let insertBookStructure = function(book) {
  let divSection = document.createElement("div");
  divSection.innerHTML =
    `<p>${book.title}</p>` +
    `<p>${book.author}</p>` +
    `<button class = 'removeButton'>Remove</button><br>`;
  divSection.id = `${booksArray.length - 1}`;

  booksDisplaySection.appendChild(divSection);
  removeBook(divSection);
}

let removeBook = function (div) {
  let removeBttn = document.getElementById(div.id).querySelector(".removeButton");
  removeBttn.addEventListener("click", function () {
    booksArray.splice(div.id, 1);
    div.remove();
    // if(booksArray.length > 0)
    // CheckInput();
  });
}

// Storage
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

let initializeBooks = function(data) {
  if(data.length > 0){
    booksArray = data;
  }
}

function CheckLocalInput() {
  const data = JSON.parse(localStorage.getItem('books'));
  if (data !== null) {
    initializeBooks(data);
    for (let i = 0; i < data.length; i += 1) {
      if (hasValue(data[i])) {
        insertBookStructure(data[i]);
      }
    }
  }
}
CheckLocalInput();

function hasValue(input) {
  if (input === '') {
    return false;
  }
  return true;
}
