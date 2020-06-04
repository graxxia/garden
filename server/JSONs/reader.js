module.exports = () => {
  var obj = require("./Hard529.json");

  //console.log(obj.selection1[1]);
  const plants = [];
  let classification = {};
  let care = {};
  let strObj = JSON.stringify(obj);
  console.log(obj.selection1[0].selection4[5].name);
  classification.name = obj.selection1[0].selection4[0].name;
  classification.family = obj.selection1[0].selection4[3].name;
  care = obj.selection1[0].selection4[5].name;
};
