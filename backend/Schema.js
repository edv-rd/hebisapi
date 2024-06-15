import mongoose from "mongoose";

const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    entry: {
        type: String,

    },
    category: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true,
    }
});

export default mongoose.model("Entry", EntrySchema);