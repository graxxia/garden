const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: String,
    family: String,
    genus: String,
    species: String,
    category: String,
    sun: String,
    water: String,
    hardiness: String,
    foliage: String,
    height: String,
    spacing: String,
    color: String,
    soil: String,
    propogation: String,
    collectionMethod: String,
    region: String,
    image: String,
  },
  {
    timestamps: true,
  }
);
schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
});

module.exports = mongoose.model("Plant", schema);
