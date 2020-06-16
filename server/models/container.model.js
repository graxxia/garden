const mongoose = require("mongoose");

const ContainerSchema = new mongoose.Schema(
  {
    name: String,
    depth: String,
    height: String,
    length: String,
    id: String,
    plants: Array,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Container", ContainerSchema);
