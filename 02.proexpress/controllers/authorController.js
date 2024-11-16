
import Author from '../models/author.js';
import { body, validationResult } from "express-validator";

const getAuthorsList = async function (req, res, next) {
    try {
        const authorList = await Author.find({}).exec();
        res.render("author_list", { title: "Author List", author_list: authorList })
    } catch (error) {
        return next(error);
    }
}

const createAuthorForm = async function (req, res, next) {
    try {
        res.send('Not Implemented: Create Author Form');
    } catch (error) {
        return next(error);
    }
}

const createAuthor = async function (req, res, next) {
    try {
        body("first_name")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage('First name must be specified')
            .isAlphanumeric()
            .withMessage('Family name has non-alhanumeric characters'),
            body("family_name")
                .trim()
                .isLength({ min: 1 })
                .escape()
                .withMessage('Family name must be specified')
                .isAlphanumeric()
                .withMessage('Family name has non-alhanumeric characters'),
            body("date_of_birth", "Invalid date of birth")
                .optional()
                .isISO8601()
                .toDate(),
            body("date_of_death", "Invalid date of death")
                .optional()
                .isISO8601()
                .toDate();

        const errors = validationResult(req);


        const author = new Author({
            family_name: req.body.family_name,
            first_name: req.body.first_name,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death,
        });

        if (!errors.isEmpty()) {
            res.render("author_form", { title: "Create Author", author: author, errors: errors.array() });
            return;
        }
        else {
            await author.save();
            console.log(`Author is saved successfully`);
        }
    } catch (error) {
        return next(error);
    }
}

const updateAuthor = async function (req, res, next) {
    try {
        res.send('Not Implemented: Update Author');
    } catch (error) {
        return next(error);
    }
}

const deleteAuthor = async function (req, res, next) {
    try {
        res.send('Not Implemented: Delete Author');
    } catch (error) {
        return next(error);
    }
}


export { getAuthorsList, createAuthor, createAuthorForm, updateAuthor, deleteAuthor };