
import Genre from '../models/genre.js';
import { body, validationResult } from "express-validator";

const getGenresList = async function (req, res, next) {
    try {
        const genreList = await Genre.find().exec();

        res.render("genres", {
            title: "Genres", genre_list: genreList
        });
    } catch (error) {
        return next(error);
    }
}

const createGenreForm = async function (req, res, next) {
    try {
        res.send('Not Implemented: Create genre Form');
    } catch (error) {
        return next(error);
    }
}

const createGenre = async function (req, res, next) {
    try {
        body("name")
            .trim()
            .isLength({ min: 3 })
            .escape()
            .withMessage('Genre must be specified');
        const errors = validationResult(req);
        const genre = new Genre({
            name: req.body.name,
        });
        if (!errors.isEmpty()) {
            res.render("genre_form", { title: "Create genre", genre: genre, errors: errors.array() });
            return;
        }
        else {
            await genre.save();
            console.log(`Genre is saved successfully`);
        }
    } catch (error) {
        return next(error);
    }
}

const updateGenre = async function (req, res, next) {
    try {
        res.send('Not Implemented: Update genre');
    } catch (error) {
        return next(error);
    }
}

const deleteGenre = async function (req, res, next) {
    try {
        res.send('Not Implemented: Delete genre');
    } catch (error) {
        return next(error);
    }
}


export { getGenresList, createGenre, createGenreForm, updateGenre, deleteGenre };