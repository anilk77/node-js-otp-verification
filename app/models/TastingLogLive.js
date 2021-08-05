var mongoose = require("mongoose");
var _ = require("lodash");

var UserSchema = new mongoose.Schema(
  {
    _id: { type: String },
    image: {
      type: String,
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
    likes: {
      type: Array,
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
  "TastingLogLive",
  UserSchema,
  "tastingLogLive"
);
