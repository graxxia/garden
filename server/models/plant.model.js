const mongoose = require("mongoose");

const PlantSchema = new mongoose.Schema(
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
    img: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Plant", PlantSchema);
