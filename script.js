
let myLibraryStored;
const bookContainer = document.getElementById('book-container');

const formFields = document.querySelector('form').querySelectorAll('input');
let isRead;

function addBookToLibrary() {

    let myLibraryTemp = [];
    //take user's input and store the new book objects into array
    let book = new Book();
    myLibraryTemp.push(book);
    sendToLocalStorage(myLibraryTemp);

    //form visual clearance
    formFields.forEach(field => {
        field.value = "";
    });

    //displays new book + stored books
    displayBooks();
}


function Book() {
    this.title = document.getElementById('title').value
    this.author = document.getElementById('author').value
    this.numPages = document.getElementById('numOfPages').value
    this.readStatus = document.querySelector('input[name="readingStatus"]:checked').value
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
                if (book[item] === "true") {
                    line.innerText = "read";
                    buttonRead.classList.add('button-read-true');
                } else if (book[item] === "false") {
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



// FEATURES TO ADD:
// CSS:
// add demo books if no books

// LOGIC
// add e.preventDefault(); on event listener not to post on url?

