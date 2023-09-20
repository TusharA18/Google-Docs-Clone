import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   data: {
      type: String,
   },
   userId: {
      type: String,
      required: true,
   },
   date: {
      type: Date,
      default: Date.now,
   },
});

const Document = mongoose.model("document", documentSchema);

export default Document;
