let myLibrary = [];

function Book(inputArray) {
    //constructor function
    this.title = inputArray[0]
    this.author = inputArray[1]
    this.numPages = inputArray[2]
    this.readStatus = inputArray[3]
}
function displayBooks(booksArray) {
    booksArray.forEach(item => {
        // document.createElement('p').innerText=item;
        console.log(item)
    })
}

const submitButton = document.getElementById('submitForm');
const formFields = document.querySelector('form').querySelectorAll('input');


submitButton.addEventListener('click', addBookToLibrary)
let userInput = [];
function addBookToLibrary() {
    //take user's input and store the new book objects into array

    formFields.forEach(field => {
        userInput.push(field.value)
        console.log(field.value)
    });
    let book = new Book(userInput);

    myLibrary.push(book)

    formFields.forEach(field => {
        field.value = "";
    });
    userInput = [];

    displayBooks(myLibrary);
}

