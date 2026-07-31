import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ElementSchema = new Schema({
    type: {
        type: String,

    },
    content: {
        type: String,
    }
});

export default mongoose.model("Element", ElementSchema);