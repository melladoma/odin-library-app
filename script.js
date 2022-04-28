
let myLibraryStored;
const bookContainer = document.getElementById('book-container');

const formFields = document.querySelector('form').querySelectorAll('input');
const submitBook = document.querySelector('#submitForm')

function addBookToLibrary() {

    // let myLibraryTemp = [];
    // let userInput = [];
    // //take user's input and store the new book objects into array
    // formFields.forEach(field => {
    //     userInput.push(field.value)
    // });
    // let book = new Book(userInput);

    myLibraryTemp.push(book);
    sendToLocalStorage(myLibraryTemp);

    //form visual clearance
    formFields.forEach(field => {
        field.value = "";
    });
    userInput = [];
    //displays new book + stored books
    displayBooks();
}

function Book(inputArray) {
    //constructor function
    this.title = inputArray[0]
    this.numPages = inputArray[2]
    this.readStatus = inputArray[3]
    this.author = inputArray[1]
}

function retrieveLocalStorage() {
    let storedArray;
    storedArray = localStorage.getItem("myLibraryStored");
    myLibraryStored = JSON.parse(storedArray);
}
function sendToLocalStorage(newArray) {
    //retrieves local storage and adds new array to it 
    retrieveLocalStorage();
    myLibraryStored.push(...newArray);
    localStorage.setItem("myLibraryStored", JSON.stringify(myLibraryStored));
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function displayBooks() {
    removeAllChildNodes(bookContainer);
    if (localStorage.getItem("myLibraryStored") != undefined) {
        retrieveLocalStorage();
    }
    myLibraryStored.forEach(book => {
        let card = document.createElement('div');
        let buttonRemove = document.createElement('button');
        buttonRemove.innerText = "-";
        buttonRemove.classList.add('button-remove');
        buttonRemove.addEventListener('click', deleteBook);

        for (let item in book) {
            let line = document.createElement('div');
            if (item === "numPages") {
                line.innerText = `${book[item]} pages`;
            } else if (item === "readStatus") {
                if (book[item] === "yes") {
                    line.innerText = "read";
                } else if (book[item] === "no") {
                    line.innerText = "not read yet";
                }
            } else {
                line.innerText = book[item];
            }
            let bookIndex = myLibraryStored.indexOf(book);
            card.setAttribute('data-key', bookIndex);
            card.setAttribute('class', 'card');
            card.appendChild(line);
            card.appendChild(buttonRemove);

        }
        bookContainer.appendChild(card)
    })
}

function deleteBook(ev) {
    const cardToDelete = ev.currentTarget.parentNode;
    bookContainer.removeChild(cardToDelete);
    let key = cardToDelete.getAttribute('data-key');
    myLibraryStored.splice(key, 1);
    localStorage.setItem("myLibraryStored", JSON.stringify(myLibraryStored));
}

displayBooks();

const submitButton = document.getElementById('submitForm');
submitButton.addEventListener('click', addBookToLibrary);

//to trouble shoot :
//double card issued? 
//add regEx sur yes/no if not input blocked
//code to refactor

