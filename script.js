const shelf = document.querySelector('#shelf');
const titleForm = document.querySelector('#title').value;
const authorForm = document.querySelector('#author').value;
const pagesForm = document.querySelector('#pages').value;
const readForm = document.querySelector('#read').checked;
const addBook = document.querySelector('#add-book');

// Starter Books
const hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const harryPotter = new Book('Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling', 246, true);

let library = [hobbit, harryPotter];

// book constructor function
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Adds books to the library array
function addBookToLibrary() {
    const newBook = new Book(titleForm, authorForm, pagesForm, readForm);
    library.push(newBook);
    render();
}

// render books, loops through library and shows the books on shelf
function render() {
    let shelfString = '';
    for (let i = 0; i < library.length; i++) {
        shelfString += `
        <div class="cover">
            <h2>${library[i].title}</h2>
            <h3>${library[i].author}</h3>
            <h4>${library[i].pages} pages</h4>
            <h4>${library[i].read ? 'Read' : 'Not read'}</h4>
        </div>
        `;
    }
    shelf.innerHTML = shelfString;
}

addBook.addEventListener('click', addBookToLibrary);
render();