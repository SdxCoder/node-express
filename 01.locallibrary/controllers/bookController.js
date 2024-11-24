import Book from '../models/book.js';

const getBooksList = async function (req, res, next) {
    try {
        const booksList = await Book.find().populate('author').populate('genre').exec();
        res.render("books", {
            title: 'Books',
            book_list: booksList
        });
    } catch (error) {
        return next(error);
    }
}

const createBookForm = async function (req, res, next) {
    try {
        res.render("book_form", {
            title: 'Add Books',
        });
    } catch (error) {
        return next(error);
    }
}

export { getBooksList, createBookForm };