let myLibrary = [];
let myLibraryStored;

function Book(inputArray) {
    //constructor function
    this.title = inputArray[0]
    this.author = inputArray[1]
    this.numPages = inputArray[2]
    this.readStatus = inputArray[3]
}
function displayBooks() {
    let storedArray = localStorage.getItem("myLibrary");
    myLibraryStored = JSON.parse(storedArray);
    myLibraryStored.forEach(item => {
        // document.createElement('p').innerText=item;
        console.log(item)
    })
}
displayBooks();
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

    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));

    displayBooks();
}

