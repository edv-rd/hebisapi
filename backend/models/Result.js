import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ResultSchema = new Schema({
    result: {
        type: String,

    },
    game: {
        type: String,

    },
    username: {
        type: String,

    },
    date: {
        type: String,
    },

});

export default mongoose.model("Result", ResultSchema);