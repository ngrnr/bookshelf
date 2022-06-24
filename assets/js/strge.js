function getData() {
  return JSON.parse(localStorage.getItem(localStorageKey)) || [];
}

function insertData(books) {
//swal("", "Berhasil menambah buku", "success");
alert(`Berhasil menambah buku.`);

  let book = books; 
  let bookData = [];

  if (localStorage.getItem(localStorageKey) === null) {
    bookData = [];
  } else {
    bookData = JSON.parse(localStorage.getItem(localStorageKey));
  }
  bookData.push(book);

  localStorage.setItem(localStorageKey, JSON.stringify(bookData));

  renderData(getData());
}

function renderData(books = []) {
  const inCompleted = document.querySelector("#incompleteBookshelfList");
  const completed = document.querySelector("#completeBookshelfList");

  inCompleted.innerHTML = "";
  completed.innerHTML = "";

  books.forEach((book) => {
    if (book.isCompleted == false) {
      let el = `
          <article class="book_item shadow">

          <div class="book-information">
              <h3 style="text-align:justify;">Judul: ${book.title}</h3>
              <p style="text-align:justify;">Penulis: ${book.author}</p>
              <p>Tahun: ${book.year}</p>
          </div>
              <div class="action action-control-book">
                  <button class="text-white" onclick="readedBook('${book.id}')" style="background-color: #47B5FF;">
                      <span class="material-icons-outlined" title="Selesai Baca"> done</span>
                  </button>
                  <button class="text-white" onclick="removeBook('${book.id}')" style="background-color: red;">
                      <span class="material-icons-outlined" title="Hapus Buku"> delete</span>
                  </button>
              </div>
          </article>
          `;

      inCompleted.innerHTML += el;
    } else {
      let el = `
          <article class="book_item shadow">
            <div class="book-information">

              <h3 style="text-align:justify;">Judul: ${book.title}</h3>
              <p style="text-align:justify;">Penulis: ${book.author}</p>
              <p>Tahun: ${book.year}</p>
              </div>

              <div class="action action-control-book" >
                  <button class="text-white" onclick="unreadedBook('${book.id}')" style="background-color: #FF7396;"> 
                      <span class="material-icons-outlined" title="Belum Selesai Baca"> playlist_remove</span>
                  </button>
                  <button class="text-white" onclick="removeBook('${book.id}')" style="background-color: red;">
                      <span class="material-icons-outlined" title="Hapus Buku"> delete</span>
                  </button>
              </div>
          </article>
          `;
      completed.innerHTML += el;
    }
  });
  getBooksInformation();
}

function removeBook(id) {
  let cfm = confirm("Yakin hapus buku ?");

  if (cfm == true) {
    const bookDataDetail = getData().filter((a) => a.id == id);
    const bookData = getData().filter((a) => a.id != id);
    localStorage.setItem(localStorageKey, JSON.stringify(bookData));
    renderData(getData());
    swal("", `Buku ${bookDataDetail[0].title} dihapus dari rak`, "success");
    //alert(`Buku ${bookDataDetail[0].title} dihapus dari rak`);
  } else {
    return 0;
  }
  getBooksInformation();
}

function readedBook(id) {
  let cfm = confirm("Pindah buku ke rak SELESAI DIBACA ?");

  if (cfm == true) {
    const bookDataDetail = getData().filter((a) => a.id == id);
    const newBook = {
      id: bookDataDetail[0].id,
      title: bookDataDetail[0].title,
      author: bookDataDetail[0].author,
      year: bookDataDetail[0].year,
      isCompleted: true,
    };

    const bookData = getData().filter((a) => a.id != id);
    localStorage.setItem(localStorageKey, JSON.stringify(bookData));

    insertData(newBook);
  } else {
    return 0;
  }
  getBooksInformation();

}

function unreadedBook(id) {
  let cfm = confirm("Pindah buku ke rak BELUM SELESAI BACA ?");

  if (cfm == true) {
    const bookDataDetail = getData().filter((a) => a.id == id);
    const newBook = {
      id: bookDataDetail[0].id,
      title: bookDataDetail[0].title,
      author: bookDataDetail[0].author,
      year: bookDataDetail[0].year,
      isCompleted: false,
    };

    const bookData = getData().filter((a) => a.id != id);
    localStorage.setItem(localStorageKey, JSON.stringify(bookData));

    insertData(newBook);
  } else {
    return 0;
  }
  getBooksInformation();

}

function getBooksInformation() {
  let completed = notCompleted = 0;
  const bookshelf = getData();

  const allBooks = bookshelf.length;


  for (let i = 0; i < allBooks; i++) {
    if(bookshelf[i]['isCompleted']){
      completed +=1
    }else{
      notCompleted +=1
    }
  }

  document.querySelector("#totalBookCount").innerHTML = allBooks;
  document.querySelector("#totalCompleteCount").innerHTML = completed;
  document.querySelector("#totalnotCompleteCount").innerHTML = notCompleted;


}

