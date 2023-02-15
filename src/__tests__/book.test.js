const request = require('supertest');
const app = require('../app');
const Book = require('../model/Book');
const {ERROR400, ERROR404, ERROR500} =require('../util/error')
const bookController = require('../controller/bookController')

describe('POST /', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('It should create a book with valid data', async () => {
    const mockCreateAccount = jest.spyOn(Book.prototype, 'createAccount');
    mockCreateAccount.mockResolvedValueOnce('Book created');

    const res = await request(app)
      .post('/api/v1/books')
      .send({
        title: 'Test Book',
        author: 'Test Author',
        ISBNCode: '1234567890',
        price: "10.99"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toBe('book created');
    expect(mockCreateAccount).toHaveBeenCalled();
  });

  test('It should return 400 error with invalid data', async () => {
    const res = await request(app)
      .post('/api/v1/books')
      .send({
        title: 'Test Book',
        author: 'Test Author',
        price: "10.99"
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual(ERROR400);
  });

  test('It should return 500 error when createAccount fails', async () => {
    const mockCreateAccount = jest.spyOn(Book.prototype, 'createAccount');
    mockCreateAccount.mockRejectedValueOnce(new Error('Something went wrong'));

    const res = await request(app)
      .post('/api/v1/books')
      .send({
        title: 'Test Book',
        author: 'Test Author',
        ISBNCode: '1234567890',
        price: "10.99"
      });

    expect(res.statusCode).toBe(500);
    expect(res.body).toBe('Internal Server Error');
    expect(mockCreateAccount).toHaveBeenCalled();
  });
});



describe('GET /', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('It should get a list of all books', async () => {
      const mockGetAllBooks = jest.spyOn(Book, 'getAllBooks');
      mockGetAllBooks.mockResolvedValueOnce(['Book 1', 'Book 2', 'Book 3']);
  
      const res = await request(app).get('/api/v1/books');
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(['Book 1', 'Book 2', 'Book 3']);
      expect(mockGetAllBooks).toHaveBeenCalled();
    });
  
    test('It should return 500 error when getAllBooks fails', async () => {
      const mockGetAllBooks = jest.spyOn(Book, 'getAllBooks');
      mockGetAllBooks.mockRejectedValueOnce(new Error('Something went wrong'));
  
      const res = await request(app).get('/api/v1/books');
  
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual(ERROR500);
      expect(mockGetAllBooks).toHaveBeenCalled();
    });
  });



  describe('GET /:id', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('It should get a book by id', async () => {
      const mockGetBookById = jest.spyOn(Book, 'getBookById');
      mockGetBookById.mockResolvedValueOnce({ title: 'Example Book', author: 'Example Author', ISBNCode: '1234567890', price: 9.99 });
  
      const res = await request(app).get('/api/v1/books/63ecea0e101a117f1ac5b17f');
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ title: 'Example Book', author: 'Example Author', ISBNCode: '1234567890', price: 9.99 });
      expect(mockGetBookById).toHaveBeenCalledWith('63ecea0e101a117f1ac5b17f');
    });
  
    test('It should return 400 error when id parameter is invalid', async () => {
      const res = await request(app).get('/api/v1/books/abc');
  
      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual(ERROR400);
    });
  
    test('It should return 500 error when getBookById fails', async () => {
      const mockGetBookById = jest.spyOn(Book, 'getBookById');
      mockGetBookById.mockRejectedValueOnce(new Error('Something went wrong'));
  
      const res = await request(app).get('/api/v1/books/63ecea0e101a117f1ac5b17f');
  
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual(ERROR500);
      expect(mockGetBookById).toHaveBeenCalledWith('63ecea0e101a117f1ac5b17f');
    });
  });



  describe('PUT /:id', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('should update a book by id', async () => {
      const mockUpdateBookById = jest.spyOn(Book, 'updateBookById');
      mockUpdateBookById.mockResolvedValueOnce('book updated');
  
      const res = await request(app)
        .put('/api/v1/books/63ecea0e101a117f1ac5b17f')
        .send({ title: 'New Book Title' });
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toBe('book updated');
      expect(mockUpdateBookById).toHaveBeenCalledWith('63ecea0e101a117f1ac5b17f', { title: 'New Book Title' });
    });
  
    test('should return a 400 error when id parameter is invalid', async () => {
      const res = await request(app).put('/api/v1/books/abc');
  
      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual(ERROR400);
    });
  
    test('should return a 500 error when updateBookById fails', async () => {
      const mockUpdateBookById = jest.spyOn(Book, 'updateBookById');
      mockUpdateBookById.mockRejectedValueOnce(new Error('Something went wrong'));
  
      const res = await request(app)
        .put('/api/v1/books/63ecea0e101a117f1ac5b17f')
        .send({ title: 'New Book Title' });
  
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual(ERROR500);
      expect(mockUpdateBookById).toHaveBeenCalledWith('63ecea0e101a117f1ac5b17f', { title: 'New Book Title' });
    });
  });







  describe('DELETE /:id', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('It should delete a book by id', async () => {
      const mockDeleteBookById = jest.spyOn(Book, 'deleteBookById');
      mockDeleteBookById.mockResolvedValueOnce({ deletedCount: 1 });
  
      const res = await request(app).delete('/api/v1/books/63eceff074f187e31d79c640');
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual("book deleted");
      expect(mockDeleteBookById).toHaveBeenCalledWith('63eceff074f187e31d79c640');
    });
  
    test('It should return 400 error when id parameter is invalid', async () => {
      const res = await request(app).delete('/api/v1/books/abc');
  
      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual(ERROR400);
    });
  
    test('It should return 500 error when deleteBookById fails', async () => {
      const mockDeleteBookById = jest.spyOn(Book, 'deleteBookById');
      mockDeleteBookById.mockRejectedValueOnce(new Error('Something went wrong'));
  
      const res = await request(app).delete('/api/v1/books/63eceff074f187e31d79c640');
  
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual(ERROR500);
      expect(mockDeleteBookById).toHaveBeenCalledWith('63eceff074f187e31d79c640');
    });
  });
  