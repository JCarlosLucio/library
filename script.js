const shelf = document.querySelector('#shelf');
const titleForm = document.querySelector('#title');
const authorForm = document.querySelector('#author');
const pagesForm = document.querySelector('#pages');
const readForm = document.querySelector('#read');
const addBook = document.querySelector('#add-book');
const newBook = document.querySelector('#new-book');
const form = document.querySelector('#form');

let deleteBookBtns = [];
let library = [];

// Starter Books
const hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
library.push(hobbit);
const harryPotter = new Book('Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling', 246, true);
library.push(harryPotter);

// book constructor function
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = library.length;
}

// Adds books to the library array
function addBookToLibrary() {
    let newBook = new Book(titleForm.value, authorForm.value, pagesForm.value, readForm.checked);
    library.push(newBook);
    render();
    formToggle();
}

// render books, loops through library and shows the books on shelf
function render() {
    let shelfString = '';
    for (let i = 0; i < library.length; i++) {
        shelfString += `
        <div class="cover">
        <button class="delete-book" data-index-number="${library[i].index}">Delete</button>
            <div class="cover-border">
                <h2>${library[i].title}</h2>
            </div>
                <h3>${library[i].author}</h3>
                <h4>${library[i].pages} pages</h4>
                <h4>${library[i].read ? 'Read' : 'Not read'}</h4>
        </div>
        `;
    }
    shelf.innerHTML = shelfString;
    //  find new delete-book btns to update the nodelist after a book is added
    deleteBookBtns = document.querySelectorAll('.delete-book');
    // gives the eventlistener to new btns created when a book is added
    activateBtns();
}

function formToggle() {
    form.classList.toggle('form-show');
    form.classList.toggle('form-hide');
}

function newBookHover() {
    if (newBook.firstElementChild.classList[1] === 'fa-book') {
        newBook.firstElementChild.classList.remove('fa-book')
        newBook.firstElementChild.classList.add('fa-book-open')
    } else if(newBook.firstElementChild.classList[1] === 'fa-book-open') {
        newBook.firstElementChild.classList.remove('fa-book-open')
        newBook.firstElementChild.classList.add('fa-book')
    }
}

// Delete book from library array
function deleteBookFromLibrary(index) {
    library.splice(index, 1);
    render();
}

// Gives the event listener to all delete-book btns, used when a book is added to also give it the eventlistener
function activateBtns() {
    deleteBookBtns.forEach(function(btn) {
        btn.addEventListener('click', e => {
            deleteBookFromLibrary(e.target.dataset.indexNumber);
        })
    })
}

newBook.addEventListener('mouseenter', newBookHover);
newBook.addEventListener('mouseleave', newBookHover);
newBook.addEventListener('click', formToggle);
addBook.addEventListener('click', addBookToLibrary);
render();