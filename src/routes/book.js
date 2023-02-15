const routes = require("express").Router();
const bookController = require("../controller/bookController");


/**
 * @openapi
 * /:
 *   get:
 *     summary: Get a list of all books
 *     description: Retrieves a list of all books from the database.
 *     responses:
 *       200:
 *         description: A list of all books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: A server error occurred while retrieving the book list.
 */

routes.get('/',bookController.getListOfAllBooks)

/**
 * @openapi
 * /:
 *   get:
 *     description: To get list of all books from database
 *     responses:
 *       200:
 *         description: Returns a list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *                   ISBNCode:
 *                     type: string
 *                   price:
 *                     type: string
 *               example:
 *                 - title: To Kill a Mockingbird
 *                   author: Harper Lee
 *                   ISBNCode: 622523
 *                   price: 212
 *                 - title: War and Peace
 *                   author: Tolstoy
 *                   ISBNCode: 432123
 *                   price: 345
 */
routes.get('/:id',bookController.getBook)

/**
 * @openapi
 * /:
 *   post:
 *     summary: Add a new book to the database
 *     description: Creates a new book record in the database with the specified book data.
 *     requestBody:
 *       description: The book data to add.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ISBNCode
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               ISBNCode:
 *                 type: string
 *               price:
 *                 type: string
 *     responses:
 *       '201':
 *         description: A success message indicating that the book was created successfully.
 *       '400':
 *         description: A message indicating that the request is invalid or missing required parameters.
 *       '500':
 *         description: A server error occurred while creating the book.
 */
routes.post('/', bookController.addBook)

routes.post('/', bookController.addBook)

/**
 * @openapi
 * /{id}:
 *   put:
 *     summary: Update a book by ID
 *     description: Updates the book with the specified ID in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the book to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: string
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               ISBNCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: A success message indicating that the book was updated successfully.
 *       400:
 *         description: A message indicating that the specified book ID is invalid.
 *       500:
 *         description: A server error occurred while updating the book.
 */

routes.put('/:id',bookController.updateBook)


/**
 * @openapi
 * /{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     description: Deletes the book with the specified ID from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the book to delete.
 *     responses:
 *       200:
 *         description: A success message indicating that the book was deleted successfully.
 *       400:
 *         description: A message indicating that the specified book ID is invalid.
 *       500:
 *         description: Internal Server Error
 */
routes.delete('/:id', bookController.deleteBook)

module.exports = routes;
