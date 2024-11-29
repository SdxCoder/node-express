import express from "express";
import path from 'path';
import { fileURLToPath } from "url";
import connectMongose from "./db_connection.js";
import catalogRouter from "./routes/catalogRouter.js";
import indexRouter from "./routes/indexRouter.js";


const app = express();
const port = 3000;
connectMongose().catch((err) => console.log(err));
// populateDb().catch((err) => console.log(err))

// Setup view templates
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Setup Route
app.use('/', indexRouter);
app.use('/catalog', catalogRouter);


export default app;