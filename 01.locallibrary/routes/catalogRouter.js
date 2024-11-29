import { Router } from "express";
import { createAuthorForm, getAuthorsList, createAuthor, getAuthorDetails, updateAuthor, getUpdateAuthorForm, deleteAuthor } from "../controllers/authorController.js";
import { getGenresList } from "../controllers/genreController.js";
import { getCreateBookForm, createBook, getBooksList, getBookDetails, getUpdateBookForm, updateBook, deleteBook } from "../controllers/bookController.js";

const router = Router();

router
    .get('/authors', getAuthorsList)
    .get('/author/create', createAuthorForm)
    .post('/author/create', createAuthor)
    .get('/author/:id/update', getUpdateAuthorForm)
    .post('/author/:id/update', updateAuthor)
    .get('/author/:id', getAuthorDetails)
    .post('/author/:id/delete', deleteAuthor)
    .get('/books', getBooksList)
    .get('/book/create', getCreateBookForm)
    .post('/book/create', createBook)
    .get('/book/:id', getBookDetails)
    .get('/book/:id/update', getUpdateBookForm)
    .post('/book/:id/update', updateBook)
    .post('/book/:id/delete', deleteBook)
    .get('/genres', getGenresList);

export default router;

