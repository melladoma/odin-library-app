
let myLibraryStored = [];
const bookContainer = document.getElementById('book-container');
const formFields = document.querySelector('form').querySelectorAll('input');

function Book() {
    this.title = document.getElementById('title').value
    this.author = document.getElementById('author').value
    this.numPages = document.getElementById('numOfPages').value
    this.readStatus = document.querySelector('input[name="readingStatus"]:checked').value
}

function addBookToLibrary() {
    let myLibraryTemp = [];
    //take user's input and store the new book objects into array
    let book = new Book();
    myLibraryTemp.push(book);
    sendToLocalStorage(myLibraryTemp);
    //displays new book + stored books
    displayBooks();
    //form visual clearance
    formFields.forEach(field => {
        field.value = "";
    });
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
    const fonts = ["'Times New Roman', Times, serif", "Helvetica, sans-serif", "'vacation_vibesregular',sans-serif", "'klemer_display_demoregular',sans-serif", "'andersregular',sans-serif"];
    const backgroundColors = ['var(--red)', 'var(--blue)', 'var(--pastel-green)', 'var(--medium-green)', 'var(--yellow)', 'var(--light-grey)'];
    const backgroundImages = ['url(./resources/backgrounds/20.png)', 'url(./resources/backgrounds/6.png)', 'url(./resources/backgrounds/28.svg)', 'url(./resources/backgrounds/11.svg)', 'url(./resources/backgrounds/12.svg)', 'url(./resources/backgrounds/27.svg)', 'url(./resources/backgrounds/37.svg)', 'url(./resources/backgrounds/21.svg)', 'url(./resources/backgrounds/13.svg)']

    removeAllChildNodes(bookContainer);

    myLibraryStored.forEach(book => {
        let card = document.createElement('div');
        let buttonRemove = document.createElement('button');
        buttonRemove.classList.add('button-remove');
        buttonRemove.addEventListener('click', deleteBook);

        let buttonRead = document.createElement('button');
        buttonRead.classList.add('button-read');
        buttonRead.addEventListener('click', toggleRead)

        let imgdiv = document.createElement('div');
        imgdiv.classList.add('img-div');
        imgdiv.style.backgroundImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

        for (let item in book) {
            let line = document.createElement('div');
            if (item === "title") {
                line.innerText = book[item];
                line.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
            } else if (item === "numPages") {
                if (book[item] != "") {
                    line.innerText = `${book[item]} pages`;
                }
            } else if (item === "readStatus") {
                if (book[item] === "true") {
                    buttonRead.classList.add('button-read-true');
                } else if (book[item] === "false") {
                    buttonRead.classList.add('button-read-add');
                }
            } else {
                line.innerText = book[item];
            }
            card.appendChild(line);
        }

        let bookIndex = myLibraryStored.indexOf(book);
        card.setAttribute('data-key', bookIndex);
        card.setAttribute('class', 'card');
        card.appendChild(imgdiv);
        card.style.backgroundColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];

        if (card.style.backgroundColor === 'var(--blue)' || card.style.backgroundColor === 'var(--red)') {
            card.style.color = "var(--light-grey)";
            imgdiv.classList.add('white-img');
        }

        card.appendChild(buttonRemove);
        card.appendChild(buttonRead);
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

function toggleRead(ev) {
    const targetCard = ev.currentTarget.parentNode;
    let key = targetCard.getAttribute('data-key');
    if (myLibraryStored[key].readStatus === "true") {
        myLibraryStored[key].readStatus = "false";
    } else if (myLibraryStored[key].readStatus === "false") {
        myLibraryStored[key].readStatus = "true";
    }
    localStorage.setItem("myLibraryStored", JSON.stringify(myLibraryStored));
    displayBooks();
}

function toggleDisplay() {
    const bookContainer = document.getElementById('book-container');
    if (displaygridActive) {
        bookContainer.classList.remove("library-container")
    } else if (!displaygridActive) {
        bookContainer.classList.add("library-container");
    }
    displaygridActive = !displaygridActive;
};

function displayModal() {
    const formContainer = document.getElementById('form-container');
    console.log(!formContainer.style.display)
    if (formContainer.style.display) {
        formContainer.style.display = 'none';
    } else if (!formContainer.style.display) {
        formContainer.style.display = 'block';
    }
}

function loadDemoBooks() {
    let newbook1 = {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        numPages: "217",
        readStatus: "false",
    }
    let newbook2 = {
        title: "Foundation",
        author: "Isaac Asimov",
        numPages: 255,
        readStatus: "false",
    }
    let newbook3 = {
        title: "Madame Bovary",
        author: "Gustave Flaubert",
        numPages: 479,
        readStatus: "false",
    }
    myLibraryStored.push(newbook1, newbook2, newbook3);
    localStorage.setItem("myLibraryStored", JSON.stringify(myLibraryStored));
}


//functions launched on loading
if (localStorage.myLibraryStored === undefined || localStorage.getItem("myLibraryStored") == '[]') {
    loadDemoBooks();
} else if (localStorage.getItem("myLibraryStored") != undefined) {
    retrieveLocalStorage();
}

displayBooks();

const submitButton = document.getElementById('submitForm');
submitButton.addEventListener('click', addBookToLibrary);

const displayButton = document.getElementById('button-display');
let displaygridActive = false;
displayButton.addEventListener('click', toggleDisplay);

const newBookButton = document.getElementById('button-add');
newBookButton.addEventListener('click', displayModal);

const closeButton = document.getElementById('close-button');
closeButton.addEventListener('click', displayModal);


//v1 ISSUE LOG:
// as this.readStatus is not a boolean but a string, ugly if/else==="true"/"false" in displayBooks() and toggleRead()
//=> need to transform this.readStatus in boolean, but didn't achieve it with a prototype function... how to do it?

// punctuation (I,Robot) and numbers (Fahrenheit) are deleted when inputted in text field 
//=> modify validation?

// if nothing is entered in read/not read => not inputted

// NICE TO HAVE
// LOGIC
// add e.preventDefault(); on event listener not to post on url?

