import express from "express";
import connectMongose from "./db_connection.js";
import populateDb from "./populatedb.js";

const app = express();
const port = 3000;
connectMongose().catch((err) => console.log(err));
populateDb().catch((err) => console.log(err))

app.get('*', function (request, response) {
    response.send('Hello new world!')
})

app.listen(port, function () {
    console.log(`The server is running http://localhost:${port}`);
});
