
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

const getGenreForm = async function (req, res, next) {
    try {
        res.render('genre_form', { title: 'Add Genres' })
    } catch (error) {
        return next(error);
    }
}

const createGenre = [
    body("genres")
        .trim()
        .isLength({ min: 3 })
        .withMessage('Genre must be specified'),
    async function (req, res, next) {
        try {
            const errors = validationResult(req);
            const genres = req.body.genres.split(',').map((e) => new Genre({
                name: e.trim()
            }));

            if (!errors.isEmpty()) {
                res.render("genre_form", { title: "Create genre", genre: genre, errors: errors.array() });
                return;
            }
            else {
                await Genre.insertMany(genres)
                res.redirect(`/catalog/genres`);
                console.log(`Genre is saved successfully`);
            }
        } catch (error) {
            return next(error);
        }
    }
]

const deleteGenre = async function (req, res, next) {
    try {
        await Genre.findByIdAndDelete(req.params.id);
        res.redirect('/catalog/genres');
    } catch (error) {
        return next(error);
    }
}


export { getGenresList, createGenre, getGenreForm, deleteGenre };