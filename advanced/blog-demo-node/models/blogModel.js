const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Review = require("./reviewModel");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

blogSchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = model("Blog", blogSchema);
