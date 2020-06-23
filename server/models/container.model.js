const mongoose = require("mongoose");

const ContainerSchema = new mongoose.Schema(
  {
    name: String,
    depth: Number,
    height: Number,
    length: Number,
    uom: String,
    userId: String,
    plants: Array,
  },
  {
    timestamps: true,
  }
);
ContainerSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
});
module.exports = mongoose.model("Container", ContainerSchema);
