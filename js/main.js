let booksArray = [];

let Book = function(title, author) {
    this.title  = title;
    this.author = author;
}

let form = document.querySelector("#bookForm");
form.addEventListener('submit', (event) => {
    let inputs = document.querySelectorAll("#bookForm input[type='text']");
    let titleValue = inputs[0].value;
    let authorValue = inputs[1].value;

    console.log(titleValue, authorValue);

    // Create book object
    let newBook = new Book(titleValue, authorValue);
    //let theTree = new Tree('Redwood')
    //let newBooko = new book(titleValue, authorValue);

    booksArray.push(newBook);
    console.log(booksArray);

/*
    books.title = titleValue;
    books.author = authorValue;
*/
    //console.log(books);

    event.preventDefault();
});
