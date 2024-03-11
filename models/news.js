const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user")
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const newsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
  },
  {
    timestamps: true,
  }
);

var News = mongoose.model("News", newsSchema);
module.exports = News;
