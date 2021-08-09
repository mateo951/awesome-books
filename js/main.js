let booksArray = [];
let Book = function (title, author) {
  this.title = title;
  this.author = author;
};
let form = document.querySelector("#submitBttn");
form.addEventListener("click", (event) => {
  let inputs = document.querySelectorAll("#bookForm input[type='text']");
  let titleValue = inputs[0].value;
  let authorValue = inputs[1].value;
  console.log(titleValue, authorValue);

  createBook(titleValue, authorValue);
  removeBook();
});

let createBook = function (titleValue, authorValue) {
  let newBook = new Book(titleValue, authorValue);
  booksArray.push(newBook);
  let divSection = document.createElement("div");
  divSection.innerHTML =
    `<p>${newBook.title}</p>` +
    `<p>${newBook.author}</p>` +
    `<button class = 'removeButton'>Remove</button>`;
  divSection.id = `${booksArray.length - 1}`;
  document.body.appendChild(divSection);
}

let removeBook = function () {
  // Remove div section
  let buttonId = document.querySelectorAll(".removeButton");
  for (let i = 0; i < buttonId.length; i = i + 1) {
    buttonId[i].addEventListener("click", function () {
      let sectionId = document.getElementById(`${i}`);
      // console.log(newBook.title);
      // Remove book from books

      console.log(sectionId);

      //booksArray.splice(i, 1);
      //sectionId.remove();
    });
  }
}
