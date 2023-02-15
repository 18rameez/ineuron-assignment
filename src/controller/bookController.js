const Book = require("../model/Book");
const { ERROR400, ERROR404, ERROR500 } = require("../util/error");
const { ObjectId } = require("mongodb");
const bookSchema = require("../schemas/book");



exports.addBook = (req, res, next) => {

  let bookData = req.body;
  const { error } = bookSchema.validate(bookData);

  if (!error) {

    const { title, author, ISBNCode, price } = bookData;
    const book = new Book(title, author, ISBNCode, price);
    book
      .createAccount()
      .then((response) => {
        res.status(201).json("book created");
      })
      .catch((err) => {
        res.status(500).json("Internal Server Error");
      });
  } else {
    res.status(400).json(ERROR400);
  }
};

exports.getBook = (req, res, next) => {
  const bookId = req.params.id;

  if (bookId && ObjectId.isValid(bookId)) {
    Book.getBookById(bookId)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json(ERROR500);
      });
  } else {
    ERROR400.detail = "The book id parameter is invalid";
    res.status(400).json(ERROR400);
  }
};

exports.getListOfAllBooks = (req, res, next) => {
  Book.getAllBooks()
    .then((bookList) => {
      res.status(200).json(bookList);
    })
    .catch((err) => {
      res.status(500).json(ERROR500);
    });
};

exports.deleteBook = (req, res, next) => {

  const bookId = req.params.id;

  if (bookId && ObjectId.isValid(bookId)) {
    Book.deleteBookById(bookId)
      .then((response) => {
        if(response.deletedCount > 0){
          res.status(200).json("book deleted");
        }else {
          res.status(400).json(ERROR404);
        }
       
      })
      .catch((err) => {
        res.status(500).json(ERROR500);
      });
  } else {
    ERROR400.detail = "The book id parameter is invalid";
    res.status(400).json(ERROR400);
  }
};

exports.updateBook = (req, res, next) => {
  
 
  const bookId = req.params.id;
  if (bookId && ObjectId.isValid(bookId) && req.body) {
    const updateBookData = req.body;
    Book.updateBookById(bookId, updateBookData)
      .then((response) => {
       
        if(response.modifiedCount > 0){
          res.status(200).json("book updated");
        }else{
          res.status(200).json("book updated");
        }
        
      })
      .catch((err) => {
        res.status(500).json(ERROR500);
      });
  } else {
    ERROR400.detail = "The book id parameter is invalid";
    res.status(400).json(ERROR400);
  }
};
