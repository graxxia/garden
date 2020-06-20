const config = require("../config/secret.db.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../config/db");
const Plant = db.Plant;

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await Plant.find();
}

async function getById(id) {
  return await Plant.findById(id);
}

async function getByName(name) {
  return await Plant.findOne({ name: name });
}

async function create(plantParam) {
  // validate
  if (await Plant.findOne({ name: plantParam.name })) {
    throw 'Plant "' + plantParam.name + '"already exists.';
  }

  const plant = new Plant(plantParam);

  // save plant
  await plant.save();
}

async function update(id, plantParam) {
  const plant = await Plant.findById(id);

  // validate
  if (!plant) throw "Plant not found";
  if (
    plant.name !== plantParam.name &&
    (await Plant.findOne({ name: plantParam.name }))
  ) {
    throw 'Username "' + plantParam.name + '" is already taken';
  }

  // copy plantParam properties to plant
  Object.assign(plant, plantParam);

  await plant.save();
}

async function _delete(id) {
  await Plant.findByIdAndRemove(id);
}
