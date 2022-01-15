{
  'use strict';

  const select = {
    bookList: '.books-list',
    bookImage: '.book__image',
    filterForm: '.filters',
  };


  const classNames = {
    bookFilter: 'hidden',
  };


  const templates = {
    books: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };


  const filters = [];



  class BookList {
    constructor(booksData){
      const thisBookList = this;

      thisBookList.getElements();
      thisBookList.renderBooks(booksData);
      thisBookList.getElements();
      thisBookList.initActions();
    }

    getElements(){
      const thisBookList = this;

      thisBookList.wrapper = document.querySelector(select.bookList);
      thisBookList.images = document.querySelectorAll(select.bookImage);
      thisBookList.filterForm = document.querySelector(select.filterForm);

      console.log(thisBookList.images);
    }

    renderBooks(booksData){
      const thisBookList = this;

      for (let book of booksData){
        let background;
        const rate = book.rating;
        const width =(rate * 10) + '%';

        if (rate <= 6) background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
        else if (rate <= 8 ) background = 'linear-gradient(to bottom,  #b4df5b 0%,#b4df5b 100%)';
        else if (rate <=9) background = 'linear-gradient(to bottom,  #299a0b 0%, #299a0b 100%)';
        else background = 'linear-gradient(to bottom,  #ff0084 0%,#ff0084 100%)';

        book.backgngCol =  background;
        book.ratingWidth = width;

        const generatedHTML = templates.books(book);
        book.DOM = utils.createDOMFromHTML(generatedHTML);
        thisBookList.wrapper.appendChild(book.DOM);
      }
    }

    renderFilter(filterArr){
      const thisBookList = this;

      for (let book of dataSource.books){
        let bookElem;

        for (let bookImgDom of thisBookList.images){
          const bookDomId = bookImgDom.getAttribute('data-id');
          if (bookDomId == book.id){
            bookElem = bookImgDom;
            bookElem.classList.remove(classNames.bookFilter);
            let detailsFalse = [];

            for (let detailID in book.details){
              const detail = book.details[detailID];
              if (!detail){
                detailsFalse.push(detailID);
              }
            }

            for (let filter of filterArr){
              if(detailsFalse.includes(filter)){
                bookElem.classList.add(classNames.bookFilter);
              }
            }
          }
        }
      }
    }

    initActions(){
      const thisBookList = this;

      const favoriteBooks = [];
      thisBookList.wrapper.addEventListener('dblclick', function(event){
        event.preventDefault();
        const elem = event.target.parentNode.parentNode;
        console.log('elem: ', elem);
        if (elem.classList.contains('book__image')){
          elem.classList.toggle('favorite');
          const bookId = elem.getAttribute('data-id');
          if (elem.classList.contains('favorite') && !(favoriteBooks.includes(bookId))){
            favoriteBooks.push(bookId);
          } else if (!(elem.classList.contains('favorite')) && favoriteBooks.includes(bookId)){
            const bookIdIndex = favoriteBooks.indexOf(bookId);
            favoriteBooks.splice(bookIdIndex, 1);
          }
        }
        console.log('favorite books IDs: ', favoriteBooks);
      });

      thisBookList.filterForm.addEventListener('click', function(event){
        //event.preventDefault();
        const elem = event.target;
        if(elem.tagName == 'INPUT' && elem.type == 'checkbox' && elem.name == 'filter'){
          console.log('clicked: ', elem.value);
          if (elem.checked){
            filters.push(elem.value);
          } else {
            const ind = filters.indexOf(elem.value);
            filters.splice(ind, 1);
          }
        }
        console.log('filters: ', filters);
        thisBookList.renderFilter(filters);
      });

    }
  }

  const app = new BookList(dataSource.books);

}
