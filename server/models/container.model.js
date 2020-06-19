const mongoose = require("mongoose");

const ContainerSchema = new mongoose.Schema(
  {
    name: String,
    depth: Number,
    height: Number,
    length: Number,
    uom: String,
    id: String,
    plants: Array,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Container", ContainerSchema);
