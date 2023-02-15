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
 * /{id}:
 *   get:
 *     summary: Get details of a book by ID
 *     description: Retrieves the details of the book with the specified ID from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the book to retrieve.
 *     responses:
 *       200:
 *         description: Book details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: The title of the book.
 *                 author:
 *                   type: string
 *                   description: The author of the book.
 *                 ISBNCode:
 *                   type: string
 *                   description: The ISBN code of the book.
 *                 price:
 *                   type: number
 *                   description: The price of the book.
 *       400:
 *         description: The specified book ID is invalid.
 *       404:
 *         description: The specified book ID could not be found.
 *       500:
 *         description: A server error occurred while retrieving the book details.
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
