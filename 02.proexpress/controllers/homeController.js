
import Author from '../models/author.js';
import Book from '../models/book.js';

const getHomePageContent = async function (req, res, next) {
    try {
        const booksList = await Book.find({}).exec();
        const authorsList = await Promise.all(booksList.map((e) => e.author._id).map(async (e) => await Author.find({ '_id': e._id }).exec()));

        const result = booksList.map((e) => {
            const foundAuthor = authorsList.find((a) => a._id === e.author._id);

            return e;
        })
        console.log(result);
        res.render("index", { title: "Dashboard", book_list: booksList })
    } catch (error) {
        return next(error);
    }
}


export { getHomePageContent };