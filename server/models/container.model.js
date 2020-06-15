const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ContainerSchema = new mongoose.Schema(
  {
    name: String,
    depth: String,
    height: String,
    length: String,
    id: String,
    plants: [{ type: Schema.Types.ObjectId, ref: "Plant" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Container", ContainerSchema);
