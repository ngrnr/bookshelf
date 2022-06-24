const localStorageKey = "BOOK_DATA";

const title = document.querySelector("#inputTitle");
const author = document.querySelector("#inputAuthor");
const year = document.querySelector("#inputYear");

const isRead = document.querySelector("#inputBookIsComplete");

const btnSubmit = document.querySelector("#bookAdd");
const searchValue = document.querySelector("#searchTitle");
const btnSearch = document.querySelector("#srcbtn");
const btnReset = document.querySelector("#resetbtn");

function formValidation() {
  function validation(check) {
    return check.value === "";
  }

  return validation(title) || validation(author) || validation(year);
}

isRead.addEventListener("change", function () {
  const isReadcheck = isRead.checked;

  if (isReadcheck) {
    document.querySelector(".isCompleted").style.display = "inline-block";
    document.querySelector(".isNotCompleted").style.display = "none";
  } else {
    document.querySelector(".isNotCompleted").style.display = "inline-block";
    document.querySelector(".isCompleted").style.display = "none";
  }
});

window.addEventListener("load", function () {
  if (localStorage.getItem(localStorageKey) !== "") {
    const booksData = getData();
    renderData(booksData);
  }
});

btnSubmit.addEventListener("click", function () {
  const formVal = formValidation();
  if (formVal) {
    //swal("", "Masih ada form kosong ! Silakan periksa ulang.", "warning");
    alert("Masih ada form kosong ! Silakan periksa ulang.");
  } else {
    const newBook = {
      id: +new Date(),
      title: title.value.trim(),
      author: author.value.trim(),
      year: year.value,
      isCompleted: isRead.checked,
    };

    insertData(newBook);
    clear();
  }
});

btnReset.addEventListener("click", function () {
  searchValue.value = "";
  renderData(getData());
});

btnSearch.addEventListener("click", function (e) {
  e.preventDefault();

  if (localStorage.getItem(localStorageKey) == "") {
    //swal("", "Buku tidak ditemukan.", "warning");
    alert("Buku tidak ditemukan");
    return location.reload();
  } else {
    const getByTitle = getData().filter(
      (a) => a.title == searchValue.value.trim()
    );
    if (getByTitle.length == 0) {
      const getByAuthor = getData().filter(
        (a) => a.author == searchValue.value.trim()
      );
      if (getByAuthor.length == 0) {
        const getByYear = getData().filter(
          (a) => a.year == searchValue.value.trim()
        );
        if (getByYear.length == 0) {
          //swal("", "Pecarian tidak ditemukan.", "warning");
          alert(`Pencarian tidak ditemukan.`);
          return location.reload();
        } else {
            renderSearchResult(getByYear);
        }
      } else {
        renderSearchResult(getByAuthor);
      }
    } else {
        renderSearchResult(getByTitle);
    }
  }

  searchValue.value = "";
});

function renderSearchResult(books) {
  renderData(books);
}

function clear() {
  title.value = "";
  author.value = "";
  year.value = "";
  isRead.checked = false;
}

