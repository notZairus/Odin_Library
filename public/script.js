let cardStyles = {
  card : "bg-secondary h-96 rounded-2xl flex flex-col text-white p-4",
  contentContainer: "flex-1 flex flex-col justify-center",
  buttonContainer: "flex gap-4 justify-center",
  bookTitle: "font-bold text-4xl text-center mb-2",
  bookPages: "font-semibold text-2xl text-center",
  bookStatus: "font-semibold text-3xl text-center mt-10",
  button: "text-white bg-red-500 py-4 px-8 text-xl font-semibold rounded-lg",
}

//BOOK CONSTRUCTOR
function Book (title, pages, status) {
  this.title = title;
  this.pages = pages;
  this.status = status;
}
Book.prototype.getInfo = function (propertyName) {
    return this[propertyName];
}


//THIS IS WHERE I PUSH THE BOOKS
let Books = [];


//THIS IS WHERE I TEMPORARILY STORE THE TITLE
//TO GET THE BOOK OBJECT INSIDE THE BOOK
let selectedBookTitle = "";


//NEEDED HTML ELEMENTS
let bookContainer = document.getElementById('bookContainer');
let dialog = document.getElementById('edit-dialog');


document.getElementById('addBook_btn').addEventListener('click', () => {
  Books.push(new Book(
      document.getElementById('title').value,
      document.getElementById('pages').value,
      document.getElementById('status').value
    )
  );

  reloadBookContainer();
  clearInputs();
});

document.getElementById('edit-addBook_btn').addEventListener('click', () => {
  Books.forEach((book, index) => {
    if (book.title == selectedBookTitle) {

      book.title = document.getElementById('edit-title').value;
      book.pages = document.getElementById('edit-pages').value;
      book.status = document.getElementById('edit-status').value;
      
      document.getElementById('edit-title').value = "";
      document.getElementById('edit-pages').value = "";
      document.getElementById('edit-status').value = "";

      reloadBookContainer();
      dialog.close();
      return;
    }
  })
})

document.getElementById('close-dialog').addEventListener('click', () => {
  document.getElementById('edit-dialog').close();
})



//FUNCTIONSSSSSS
function reloadBookContainer () {
  while(bookContainer.firstElementChild) {
    bookContainer.firstElementChild.remove();
  }

  Books.forEach(book => {
    let card = document.createElement('div');
    card.classList = cardStyles.card;
    bookContainer.appendChild(card);

    let contentContainer = document.createElement('div');
    contentContainer.classList = cardStyles.contentContainer;
    card.appendChild(contentContainer);

    let bookTitle = document.createElement('p');
    bookTitle.classList = cardStyles.bookTitle;
    bookTitle.textContent = book.title;
    contentContainer.appendChild(bookTitle);

    let bookPages = document.createElement('p');
    bookPages.classList = cardStyles.bookPages;
    bookPages.textContent = book.pages;
    contentContainer.appendChild(bookPages);

    let bookStatus = document.createElement('p');
    bookStatus.classList = cardStyles.bookStatus;
    bookStatus.textContent = book.status;
    contentContainer.appendChild(bookStatus);

    let buttonContainer = document.createElement('div');
    buttonContainer.classList = cardStyles.buttonContainer;
    card.appendChild(buttonContainer);

    let editBtn = document.createElement('button');
    editBtn.dataset.title = book.title;
    editBtn.classList = cardStyles.button;
    editBtn.textContent = "Edit";
    buttonContainer.appendChild(editBtn);

    editBtn.addEventListener('click', () => {
      dialog.showModal();
      selectedBookTitle = editBtn.dataset.title;

      document.getElementById('edit-title').value = book.title;
      document.getElementById('edit-pages').value = book.pages;
      document.getElementById('edit-status').value = book.status;
    })

    let deleteBtn = document.createElement('button');
    deleteBtn.dataset.title = book.title;
    deleteBtn.classList = cardStyles.button;
    deleteBtn.textContent = "Delete";
    buttonContainer.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', (event) => {
      let target = event.target;

      Books.forEach((book, index) => {
        if (book.title == target.dataset.title) {
          Books.splice(index, 1);
          reloadBookContainer();
          return;
        }
      })
    })
  });
}

function clearInputs () {
  document.getElementById('title').value = "";
  document.getElementById('pages').value = "";
  document.getElementById('status').value = "";
}