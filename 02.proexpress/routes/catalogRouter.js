import { Router } from "express";
import { createAuthorForm, getAuthorsList, createAuthor } from "../controllers/authorController.js";

const router = Router();

router
    .get('/authors', getAuthorsList)
    .get('/author/create', createAuthorForm)
    .post('/author/create', createAuthor);

export default router;

