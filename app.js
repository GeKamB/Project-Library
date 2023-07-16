const newBookBttn = document.querySelector('.new-book-btn');
const submitBttn = document.querySelector('#submit');
const modal = document.querySelector('.modal');
const library = document.querySelector('.library');

const span = document.querySelector(".close");

span.addEventListener('click', function () {
    modal.style.display = 'none';
});

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };





newBookBttn.addEventListener('click', () => {
    modal.style.display = 'block';    
});


let myLibrary = [];

function Book(title, author, pages, read ) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read

}
Book.prototype.readArraySwitch = function () {
    if (this.read === 'read') {
        this.read = 'not read';
    } else {
        this.read = 'read';
    }
}


submitBttn.addEventListener('click', addBookToLibrary, false);

function addBookToLibrary(event) {  
    event.preventDefault();
    let bookTitle = document.getElementById('book-title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let readed = document.querySelector('#read-the-book').value;
    let newBook = new Book(bookTitle, author, pages, readed);
    
    if (bookTitle === '' || author === '' || pages == '') {
        alert('fill all the fields');
    } else {
        
         myLibrary.push(newBook);
    };
    
    while (library.firstChild) {
        library.removeChild(library.lastChild);
      };
      populateLibrary();
      readSwitch();
      removeBttn();
      modal.style.display = 'none'
      
      

    
      
};




function populateLibrary() {
    myLibrary.forEach((item, index) => {
        let card = document.createElement('div');
        card.classList.add('card');
        library.insertAdjacentElement('beforeend', card);
        card.setAttribute('card-id', index);

        let cardTitle = document.createElement('h2');
        cardTitle.textContent = item.title;
        let cardAuthor = document.createElement('p');
        cardAuthor.textContent = `${item.author}`;
        let cardPages = document.createElement('p');
        cardPages.textContent = `${item.pages} Pages`;
        let cardRead = document.createElement('button');
        cardRead.classList.add('readBttn');
        cardRead.classList.add('bttn');
        cardRead.textContent = `${item.read}`;
        let removeBttn = document.createElement('button');
        removeBttn.classList.add('removeBttn');
        removeBttn.classList.add('bttn');
        removeBttn.textContent = 'remove';
        

        
        card.append(cardTitle);
        card.append(cardAuthor);
        card.append(cardPages);
        card.append(cardRead);
        card.append(removeBttn);
        
         
        
        
    });
    
    
};

let readSwitch = () => {
const buttons = document.querySelectorAll('.readBttn');

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        let indexToRemove = e.target.parentElement.getAttribute('card-id');
    
    let isReadbttnPresent = button.classList.contains("readBttn"); 
    if (isReadbttnPresent) {
        button.classList.remove('readBttn');
        button.classList.add('notRead');
        button.textContent = 'not read';
        myLibrary[indexToRemove].readArraySwitch();
        
    } else {
        button.classList.remove('notRead');
        button.classList.add('readBttn');
        button.textContent = '  read  ';
        myLibrary[indexToRemove].readArraySwitch();

    }
       
        
    });
});
};

let removeBttn = () => {
  const remBttns = document.querySelectorAll('.removeBttn') ;
  
  remBttns.forEach((bttn) => {
    bttn.addEventListener('click', (e) => {
    let indexToRemove = e.target.parentElement.getAttribute('card-id');
    console.log(indexToRemove); 
    e.target.parentNode.remove();
    myLibrary.splice(indexToRemove, 1);
    console.log(myLibrary);  
    } )

  })
};


