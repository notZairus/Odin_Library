
function Book (title, pages, status){
  this.title = title;
  this.pages = pages;
  this.status = status;
}

Book.prototype.getInfo = function (propertyName) {
    return this[propertyName];
}

let cardStyles = {
  card : "bg-secondary h-96 rounded-2xl flex flex-col text-white p-4",
  contentContainer: "flex-1 flex flex-col justify-center",
  buttonContainer: "flex gap-4 justify-center",
  bookTitle: "font-bold text-4xl text-center mb-2",
  bookPages: "font-semibold text-2xl text-center",
  status: "font-semibold text-3xl text-center mt-10",
  button: "text-white bg-red-500 py-4 px-8 text-xl font-semibold rounded-lg",
}

function displayNewBook () {
  let card = document.createElement('div');
  card.dataset.title = document.getElementById('title').value;
  card.className = cardStyles.card;

  let contentContainer = document.createElement('div');
  contentContainer.className = cardStyles.contentContainer;
  card.appendChild(contentContainer);

  let bookTitle = document.createElement('p');
  bookTitle.textContent = document.getElementById('title').value;
  bookTitle.className = cardStyles.bookTitle;
  contentContainer.appendChild(bookTitle);

  let bookPages = document.createElement('p');
  bookPages.textContent = document.getElementById('pages').value;
  bookPages.className = cardStyles.bookPages;
  contentContainer.appendChild(bookPages);

  let status = document.createElement('p');
  status.textContent = document.getElementById('status').value;
  status.className = cardStyles.status;
  contentContainer.appendChild(status);

  let buttonContainer = document.createElement('div');
  buttonContainer.className = cardStyles.buttonContainer;
  card.appendChild(buttonContainer);

  let Editbutton = document.createElement('button');
  Editbutton.textContent = "Edit";
  Editbutton.dataset.title = document.getElementById('title').value;
  Editbutton.className = cardStyles.button;
  buttonContainer.appendChild(Editbutton);
  
  let Deletebutton = document.createElement('button');
  Deletebutton.textContent = "Delete";
  Deletebutton.dataset.title = document.getElementById('title').value;
  Deletebutton.className = cardStyles.button;
  buttonContainer.appendChild(Deletebutton);

  bookContainer.appendChild(card);

  buttonContainer.addEventListener('click', (event) => {
    let target = event.target;

    if (target.textContent != 'Delete') {
      return;
    }
    
    buttonContainer.parentElement.remove();

    Books = Books.filter(function (book) {
      return book.title != target.dataset.title;
    });
  })
}

function clearInputs () {
  document.getElementById('title').value = "";
  document.getElementById('pages').value = "";
  document.getElementById('status').value = "";
}

function addBook() {
  Books.push(
    new Book(
      document.getElementById('title').value,
      document.getElementById('pages').value,
      document.getElementById('status').value
    )
  );
}



let Books = [];

let AddBtn = document.getElementById('addBook_btn');
let bookContainer = document.getElementById('bookContainer');

AddBtn.addEventListener('click', () => {
  displayNewBook();
  addBook();
  clearInputs();
})