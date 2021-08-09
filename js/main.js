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
  // Create book object
  let newBook = new Book(titleValue, authorValue);
  booksArray.push(newBook);
  console.log(booksArray);
  let divSection = document.createElement("div");
  divSection.innerHTML =
    "<p>Title</p>" +
    "<p>Author</p>" +
    `<button class = 'removeButton'>Remove</button>`;
  divSection.id = `${booksArray.length - 1}`;
  document.body.appendChild(divSection);
  let buttonId = document.querySelectorAll(".removeButton");
  console.log(buttonId);
  for (let i = 0; i < buttonId.length; i = i + 1) {
    buttonId[i].addEventListener("click", function () {
      let sectionId = document.getElementById(`${i}`);
      sectionId.remove();
    });
  }
});
