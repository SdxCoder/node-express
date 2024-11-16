
import { Schema, model } from "mongoose";


const AuthorSchema = new Schema({
    family_name: { type: String, required: true },
    first_name: { type: String, required: true },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
});

AuthorSchema.virtual("name").get(function () {
    let fullname = "";
    if (this.family_name && this.first_name) {
        fullname = `${this.family_name} ${this.first_name}`;
    }
    return fullname;
});


AuthorSchema.virtual("url").get(function () {
    return `catalog/author/${this._id}`;
})

export default model('Author', AuthorSchema);


