let myLibrary = [];
let myLibraryStored;
let storedArray;

function Book(inputArray) {
    //constructor function
    this.title = inputArray[0]
    this.author = inputArray[1]
    this.numPages = inputArray[2]
    this.readStatus = inputArray[3]
}

function retrieveLocalStorage() {
    storedArray = localStorage.getItem("myLibraryStored");
    myLibraryStored = JSON.parse(storedArray);
}
function sendToLocalStorage(newArray) {
    //retrieves local storage and adds new array to it 
    retrieveLocalStorage();
    myLibraryStored.push(...newArray);
    localStorage.setItem("myLibraryStored", JSON.stringify(myLibraryStored));
}

function displayBooks() {
    if (localStorage.getItem("myLibraryStored") != undefined) {
        retrieveLocalStorage();
        myLibraryStored.forEach(item => {
            console.log(item)
        })
    }
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
    sendToLocalStorage(myLibrary);

    formFields.forEach(field => {
        field.value = "";
    });
    userInput = [];


    displayBooks();
}

