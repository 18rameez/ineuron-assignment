const  {ObjectId} = require("mongodb");
const getDb = require("../util/database").getDb;



class Book {

    constructor(title, author, ISBNCode, price){
        this.title = title;
        this.author = author;
        this.ISBNCode =ISBNCode
        this.price = price ;
    }

    createAccount(){
        const db = getDb();
        return db.collection("books").insertOne(this);
    }

    static getAllBooks(){
        const db = getDb();
        return db.collection("books").find()
        .toArray()
        
    }

    static getBookById(bookId){
        const db = getDb();
        return db.collection("books").findOne({_id : new ObjectId(bookId)})
    }

    static deleteBookById(bookId){
        const db = getDb();
        return db.collection("books").deleteOne({_id : new ObjectId(bookId)})
    }

    static updateBookById(bookId, updateBookData){
        const db = getDb();
        return db.collection("books").updateOne({_id : new ObjectId(bookId)},{$set : updateBookData})
    }
}

module.exports = Book;