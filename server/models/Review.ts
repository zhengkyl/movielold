import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  tmdbId: {
    // The Movie DB ID
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  // remember to use doc.markModified(path) before saving
  formSchema: {
    // JSON form schema
    type: Schema.Types.Mixed,
    required: true,
  },
  formValues: {
    // key value pairs correspond to schema
    type: Schema.Types.Mixed,
    required: true,
  },
});

export default mongoose.model("Review", reviewSchema);
