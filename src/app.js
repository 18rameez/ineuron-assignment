const express = require("express");
const app = express();
const bookRoute = require("./routes/book");
const bodyParser = require("body-parser");

module.exports = app;

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    definition : {
        openapi: '3.0.0',
        info: {
            title: 'API ',
            version :'1.0.0'
        },
        servers : [
            {
              url :  'http://localhost:5010/api/v1/books'
            }
        ]
    },
    apis: ['./src/routes/book.js'],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

require("dotenv").config();

app.use("/api/v1/books", bookRoute);


module.exports = app;