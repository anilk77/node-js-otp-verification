var mongoose = require("mongoose");
var _ = require("lodash");

var UserSchema = new mongoose.Schema(
  {
    _id: { type: String },
    spirit: {
      type: String,
    },
    score: {
      type: Number,
    },
    colorIndex: {
      type: Number,
    },
    selections: {
      type: Object,
    },
    image: {
      type: String,
    },
    tastingNotes: {
      type: Number,
    },
    likes: {
      type: Array,
    },
    likeCount: {
      type: Number,
    },
    isBlog: {
      type: Boolean,
    },
    blogData: {
      type: Array,
    },
    caption: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    hidden: {
      type: Boolean,
    }
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model(
  "OakBottleTastingLog",
  UserSchema,
  "OakBottleTastingLog"
);
