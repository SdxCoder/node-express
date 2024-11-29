import Book from '../models/book.js';
import Author from '../models/author.js';
import Genre from '../models/genre.js';
import { body, validationResult } from 'express-validator';

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

const getCreateBookForm = async function (req, res, next) {
    try {
        const authors = await Author.find().exec();
        const genres = await Genre.find().exec();
        res.render("book_form", {
            title: 'Add Books',
            authors: authors,
            genres: genres,
        });
    } catch (error) {
        return next(error);
    }
}

const createBook = [
    validateTitle(),
    validateSummary(),
    validateIsbn(),
    validateGenre(),
    validateAuthor(),
    async function (req, res, next) {
        try {
            const errors = validationResult(req);
            const book = new Book({
                title: req.body.title,
                author: req.body.author,
                summary: req.body.summary,
                genre: req.body.genre,
                isbn: req.body.isbn,
            });

            if (!errors.isEmpty()) {
                const authors = await Author.find().exec();
                const genresDocs = await Genre.find().exec();
                const genres = handleSelectedGenres(genresDocs, book.genre);
                res.render("book_form", {
                    title: 'Add Books',
                    book: book,
                    authors: authors,
                    genres: genres,
                    errors: errors.array(),
                });
            }
            else {
                await book.save();
                res.redirect(book.url);
            }

        } catch (error) {
            return next(error);
        }
    }
]


const updateBook = [
    validateTitle(),
    validateSummary(),
    validateIsbn(),
    validateGenre(),
    validateAuthor(),
    async function (req, res, next) {
        try {
            const errors = validationResult(req);
            const book = new Book({
                title: req.body.title,
                author: req.body.author,
                summary: req.body.summary,
                genre: req.body.genre,
                isbn: req.body.isbn,
                _id: req.params.id,
            });

            if (!errors.isEmpty()) {
                const authors = await Author.find().exec();
                const genresDocs = await Genre.find().exec();
                const genres = handleSelectedGenres(genresDocs, book.genre);
                res.render("book_form", {
                    title: 'Update Books',
                    book: book,
                    authors: authors,
                    genres: genres,
                    errors: errors.array(),
                });
            }
            else {
                await Book.findByIdAndUpdate(req.params.id, book);
                res.redirect(book.url);
            }

        } catch (error) {
            return next(error);
        }
    }
]

const getUpdateBookForm = async function (req, res, next) {
    try {
        const book = await Book.findById(req.params.id).populate('author').populate('genre').exec();
        const authors = await Author.find().exec();
        const genresDocs = await Genre.find().exec();
        const genres = handleSelectedGenres(genresDocs, book.genre);
        if (book === null) {
            const err = new Error('Book not found.');
            res.next(err);
        }
        res.render("book_form", { title: "Update Book", genres: genres, authors: authors, book: book });
    } catch (error) {
        return next(error);
    }
}

const getBookDetails = async function (req, res, next) {
    try {
        const book = await Book.findById(req.params.id).populate('author').populate('genre').exec();
        if (book === null) {
            const err = new Error('Author not found.');
            res.next(err);
        }
        res.render("book_details", { title: "Book Detail", book: book })
    } catch (error) {
        return next(error);
    }
}

const deleteBook = async function (req, res, next) {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.redirect('/catalog/books');
    } catch (error) {
        next(error);
    }
}

function handleSelectedGenres(genreList, selectedGenres) {
    return genreList.map(value => {
        const genreObject = value.toObject();
        const genreExists = selectedGenres.map(e => e._id.toString()).includes(genreObject._id.toString());
        genreObject.checked = genreExists;
        return genreObject;
    });
}


function validateTitle() {
    return body("title")
        .trim()
        .isLength({ length: 3 })
        .escape()
        .withMessage('Title must be specified');
}

function validateSummary() {
    return body("summary")
        .trim()
        .isLength({ length: 3 })
        .escape()
        .withMessage('Summary must be specified');
}

function validateIsbn() {
    return body("isbn")
        .isNumeric()
        .withMessage('Isbn not valid.');

}

function validateAuthor() {
    return body("author")
        .notEmpty()
        .withMessage('Select author');

}

function validateGenre() {
    return body("genre")
        .notEmpty()
        .withMessage('Select genre');

}

export { getBooksList, getCreateBookForm, createBook, getBookDetails, updateBook, getUpdateBookForm, deleteBook };