import { Schema, model } from "mongoose";

const GenreSchema = new Schema({
    name: { type: String, required: true },
});

GenreSchema.virtual("url").get(function () {
    return `/catalog/genre/${this._id}`;
});

export default model("Genre", GenreSchema);
