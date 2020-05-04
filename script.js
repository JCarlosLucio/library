const shelf = document.querySelector('#shelf');
const titleForm = document.querySelector('#title');
const authorForm = document.querySelector('#author');
const pagesForm = document.querySelector('#pages');
const readForm = document.querySelector('#read');
const newBookForm = document.querySelector('#new-book-form');
const newBook = document.querySelector('#new-book');
const form = document.querySelector('#form');
const darkModeNodes = document.querySelectorAll('.dark-mode');
const darkModeToggle = document.querySelector('#dark-mode-toggle');
let deleteBookBtns = [];
let readBtns = [];

class Book {
	// book constructor function
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}
	// Toggle Book.read
	readToggle() {
		return this.read ? (this.read = false) : (this.read = true);
	}
}

// Starter Books
const hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const harryPotter = new Book("Harry Potter and the Philosopher's Stone", 'J.K. Rowling', 246, true);
let library = [ hobbit, harryPotter ];

// Adds books to the library array
function addBookToLibrary(event) {
	let newBook = new Book(titleForm.value, authorForm.value, pagesForm.value, readForm.checked);
	library.push(newBook);
	titleForm.value = '';
	authorForm.value = '';
	pagesForm.value = '';
	readForm.checked = true;
	populateStorage();
	render();
	formToggle();
	event.preventDefault();
}

// render books, checks if theres localStorage then sets up the library toloops through and shows the books on shelf
function render() {
	if (!localStorage.getItem('library')) {
		populateStorage();
	}
	// Set local storage as the library array, returning it from a string with JSON.parse
	library = JSON.parse(localStorage.getItem('library'));
	let shelfString = '';
	for (let i = 0; i < library.length; i++) {
		shelfString += `
        <div class="cover">
        <button class="delete-book" data-title="${library[i].title}">Delete</button>
            <div class="cover-border">
                <h2>${library[i].title}</h2>
            </div>
                <h3>${library[i].author}</h3>
                <h4>${library[i].pages} pages</h4>
                <button class="read-btn" data-title="${library[i].title}">
                    ${library[i].read ? 'Read' : 'Not read'}
                </button>
        </div>
        `;
	}
	shelf.innerHTML = shelfString;
	//  find new delete-book/read-btn btns to update the nodelist after a book is added
	deleteBookBtns = document.querySelectorAll('.delete-book');
	readBtns = document.querySelectorAll('.read-btn');
	// gives the eventlistener to new btns created when a book is added
	activateBtns();
	// The type-juggling when using localStorage removes the Book.prototype from the objects stored
	// so the Books are recreated after getting them from localStorage, so they can get the readToggle method
	for (let i = 0; i < library.length; i++) {
		library[i] = new Book(library[i].title, library[i].author, library[i].pages, library[i].read);
	}
	// Another way to do it would be to set readToggle method with Object.prototype as follows
	// Object.prototype.readToggle = function() {
	// 	return this.read ? (this.read = false) : (this.read = true);
	// };
	// but its better to limit readToggle method to only Books
}

function formToggle() {
	form.classList.toggle('form-show');
	form.classList.toggle('form-hide');
}

function newBookHover() {
	if (newBook.firstElementChild.classList[1] === 'fa-book') {
		newBook.firstElementChild.classList.remove('fa-book');
		newBook.firstElementChild.classList.add('fa-book-open');
	} else if (newBook.firstElementChild.classList[1] === 'fa-book-open') {
		newBook.firstElementChild.classList.remove('fa-book-open');
		newBook.firstElementChild.classList.add('fa-book');
	}
}

function toggleDarkMode() {
	darkModeNodes.forEach((node) => {
		if (node.classList.value.includes('light')) {
			node.classList.remove('light');
			node.classList.add('dark');
			darkModeToggle.textContent = 'Light Mode';
		} else {
			node.classList.remove('dark');
			node.classList.add('light');
			darkModeToggle.textContent = 'Dark Mode';
		}
	});
}

// populate localStorage
//  library needs to be made into a string to be stored in localStorage using JSON.stringify
function populateStorage() {
	localStorage.setItem('library', JSON.stringify(library));
}

// Delete book from library array
function deleteBookFromLibrary(index) {
	library.splice(index, 1);
	populateStorage();
	render();
}

// Gives the event listener to all delete-book btns, used when a book is added to also give it the eventlistener
function activateBtns() {
	deleteBookBtns.forEach(function(btn) {
		btn.addEventListener('click', (e) => {
			// finds the index of the object in array that matches the title
			// if multiple objs have the same title it will delete the first obj in the array that matches the title
			// if i wanted to be more specific I could give the obj an ".id" with a hash
			let index = library.findIndex((objInLibrary) => objInLibrary.title === e.target.dataset.title);
			deleteBookFromLibrary(index);
		});
	});
	readBtns.forEach(function(btn) {
		btn.addEventListener('click', (e) => {
			// if multiple objs have the same title it will change the status of only the first one
			let index = library.findIndex((objInLibrary) => objInLibrary.title === e.target.dataset.title);
			library[index].readToggle();
			populateStorage();
			render();
		});
	});
}

darkModeToggle.addEventListener('click', toggleDarkMode);
newBook.addEventListener('mouseenter', newBookHover);
newBook.addEventListener('mouseleave', newBookHover);
newBook.addEventListener('click', formToggle);
newBookForm.addEventListener('submit', addBookToLibrary);
render();
