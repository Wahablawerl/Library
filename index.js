const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function () {
    const readStatus = this.read ? "Read" : "Not Read";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
  };

  this.toggleRead = function () {
    this.read = !this.read;
  };
}

function addBookToLibrary(title, author, pages, read) {
  try {
    if (!title || !author || !pages) {
      throw new Error("Please fill in all required fields.");
    }

    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
  } catch (error) {
    alert(error.message);
  }
}

function displayBooks() {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = ""; // Clear previous content

  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];

    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.setAttribute("data-index", i);

    const bookTitle = document.createElement("h3");
    bookTitle.textContent = book.title;

    const bookInfo = document.createElement("p");
    bookInfo.textContent = book.info();

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove");
    removeButton.addEventListener("click", removeBook);

    const toggleReadButton = document.createElement("button");
    toggleReadButton.textContent = "Toggle Read";
    toggleReadButton.addEventListener("click", function () {
      book.toggleRead();
      bookInfo.textContent = book.info();
    });

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookInfo);
    bookCard.appendChild(removeButton);
    bookCard.appendChild(toggleReadButton);

    bookList.appendChild(bookCard);
  }
}

function removeBook(event) {
  const bookCard = event.target.parentElement;
  const index = bookCard.getAttribute("data-index");
  myLibrary.splice(index, 1);
  displayBooks();
}

// Add initial books to the library (optional)
myLibrary.push(new Book("The Hobbit", "J.R.R. Tolkien", 295, false));
myLibrary.push(new Book("1984", "George Orwell", 328, true));

// Display books on initial load
displayBooks();

// Add book form submission handler
const addBookForm = document.getElementById("addBookForm");
addBookForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;
  addBookToLibrary(title, author, pages, read);
});

// Show/hide add book form button
const addBookButton = document.getElementById("addBookButton");
addBookButton.addEventListener("click", function () {
  addBookForm.style.display =
    addBookForm.style.display === "block" ? "none" : "block";
});
