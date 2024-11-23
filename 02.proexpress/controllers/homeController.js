
import Book from '../models/book.js';

const getHomePageContent = async function (req, res, next) {
    try {
        const booksList = await Book.find()
            .populate('author').populate('genre').exec();
        res.render("index", {
            title: 'Dashboard',
            book_list: booksList
        });
    } catch (error) {
        return next(error);
    }
}

export { getHomePageContent };