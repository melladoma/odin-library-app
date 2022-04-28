
let myLibraryStored;
const bookContainer = document.getElementById('book-container');

const formFields = document.querySelector('form').querySelectorAll('input');
let isRead;

function addBookToLibrary() {

    let myLibraryTemp = [];
    let userInput = [];
    //take user's input and store the new book objects into array
    formFields.forEach(field => {
        userInput.push(field.value)
    });
    let book = new Book(userInput);
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
        buttonRemove.classList.add('button-remove');
        buttonRemove.addEventListener('click', deleteBook);

        let buttonRead = document.createElement('button');
        buttonRead.classList.add('button-read');

        for (let item in book) {
            let line = document.createElement('div');
            if (item === "numPages") {
                line.innerText = `${book[item]} pages`;
            } else if (item === "readStatus") {
                if (book[item] === "yes") {
                    line.innerText = "read";
                    buttonRead.classList.add('button-read-true');
                } else if (book[item] === "no") {
                    line.innerText = "not read yet";
                    buttonRead.classList.add('button-read-add');
                }
            } else {
                line.innerText = book[item];
            }
            let bookIndex = myLibraryStored.indexOf(book);
            card.setAttribute('data-key', bookIndex);
            card.setAttribute('class', 'card');
            card.appendChild(line);
            card.appendChild(buttonRemove);
            card.appendChild(buttonRead);
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
    displayBooks();

}

displayBooks();

const submitButton = document.getElementById('submitForm');
submitButton.addEventListener('click', addBookToLibrary);


//ISSUE LOG:
// LOGIC
//input block yes/no not working with radio button or checbox... refactoring needed

// CSS:
// add demo books if no books

//code to refactor
// let inputTitle = document.getElementById('title');
// let inputAuthor = document.getElementById('author');
// let inputPages = document.getElementById('numOfPages');
// let inputRead = document.getElementById('readStatus')
// submitButton.addEventListener('click', function (e) {
//     e.preventDefault();
//     let newBook = new Book(
//         inputTitle.value,
//         inputAuthor.value,
//         inputPages.value,
//         inputRead.value
//     );
// });
