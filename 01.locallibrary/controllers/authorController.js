
import Author from '../models/author.js';
import { body, validationResult } from "express-validator";
import Book from '../models/book.js';

const getAuthorsList = async function (req, res, next) {
    try {
        const authorList = await Author.find({}).exec();
        res.render("authors", {
            title: "Authors",
            author_list: authorList,
        })
    } catch (error) {
        return next(error);
    }
}

const getAuthorDetails = async function (req, res, next) {
    try {
        const author = await Author.findById(req.params.id).exec();
        const books = await Book.find({ author: author.id });
        if (author === null) {
            const err = new Error('Author not found.');
            err.status = 400;
            return res.next(err);
        }
        res.render("author_details", { title: "Author Detail", author: author, books: books })
    } catch (error) {
        return next(error);
    }
}

const createAuthorForm = async function (req, res, next) {
    try {
        res.render("author_form", { title: "Add Author", btnText: 'Submit' })
    } catch (error) {
        return next(error);
    }
}

const createAuthor = [
    validateName(),
    validateFamilyName(),
    validateDate('date_of_birth', 'Invalid date of birth'),
    validateDate('date_of_death', 'Invalid date of death'),
    async function (req, res, next) {
        try {
            const errors = validationResult(req);
            const author = new Author({
                family_name: req.body.family_name,
                first_name: req.body.first_name,
                date_of_birth: req.body.date_of_birth,
                date_of_death: req.body.date_of_death,
            });

            if (!errors.isEmpty()) {
                res.render("author_form", { title: "Create Author", author: author, errors: errors.array(), btnText: 'Submit' });
            }
            else {
                await author.save();
                console.log(`Author is saved successfully`);
                res.redirect(author.url);
            }
        } catch (error) {
            return next(error);
        }
    }
];


const getUpdateAuthorForm = async function (req, res, next) {
    try {
        const author = await Author.findById(req.params.id);
        if (author === null) {
            const err = new Error('Author not found');
            err.status = 400;
            return next(err);
        }
        res.render('author_form', { title: 'Update Author', author: author, btnText: 'Update' });
    } catch (err) {
        next(err);
    }
}

const updateAuthor = [
    validateName(),
    validateFamilyName(),
    validateDate('date_of_birth', 'Invalid date of birth'),
    validateDate('date_of_death', 'Invalid date of death'),
    async function (req, res, next) {
        try {
            const errors = validationResult(req);
            const author = new Author({
                first_name: req.body.first_name,
                family_name: req.body.family_name,
                date_of_birth: req.body.date_of_birth,
                date_of_death: req.body.date_of_death,
                _id: req.params.id,
            });
            if (!errors.isEmpty()) {
                res.render('author_form', { title: 'Update Author', author: author, errors: errors.array(), btnText: 'Update' });
            }
            else {
                await Author.findByIdAndUpdate(req.params.id, author);
                res.redirect(`/catalog/authors`);
            }

        } catch (error) {
            return next(error);
        }
    }
]

const deleteAuthor = async function (req, res, next) {
    try {
        await Author.findByIdAndDelete(req.params.id);
        res.redirect('/catalog/authors');
    }
    catch (err) {
        next(err);
    }
}


function validateName() {
    return body("first_name")
        .trim()
        .isLength({ min: 2 })
        .escape()
        .withMessage('First name must be specified')
        .isAlpha()
        .withMessage('First name has non-alphabetic characters');
}

function validateFamilyName() {
    return body("family_name")
        .trim()
        .isLength({ min: 2 })
        .escape()
        .withMessage('Family name must be specified')
        .isAlpha()
        .withMessage('Family name has non-alphabetic characters');
}

function validateDate(key, msg) {
    return body(`"${key}"`, msg)
        .optional({ values: "falsy" })
        .isISO8601()
        .toDate();
}


export { getAuthorsList, createAuthor, createAuthorForm, getUpdateAuthorForm, updateAuthor, getAuthorDetails, deleteAuthor };