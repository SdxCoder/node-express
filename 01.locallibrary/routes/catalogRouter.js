import { Router } from "express";
import { createAuthorForm, getAuthorsList, createAuthor } from "../controllers/authorController.js";
import { getGenresList } from "../controllers/genreController.js";
import { createBookForm, getBooksList } from "../controllers/bookController.js";

const router = Router();

router
    .get('/authors', getAuthorsList)
    .get('/author/create', createAuthorForm)
    .post('/author/create', createAuthor)
    .get('/genres', getGenresList)
    .get('/books', getBooksList)
    .get('/book/create', createBookForm)
    .post('/book/create', getBooksList);

export default router;

