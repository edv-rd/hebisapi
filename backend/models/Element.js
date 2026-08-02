import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ElementSchema = new Schema({
    type: {
        type: String,
        required: [true, "type cannot be empty"],
        trim: true,
    },
    content: {
        type: String,
        required: [true, "content cannot be empty"],
        trim: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
});

export default mongoose.model("Element", ElementSchema);