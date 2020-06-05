module.exports = () => {
  var obj = require("./Hard529.json");

  //console.log(obj.selection1[1]);
  const plants = [];
  //arr

  Object.keys(obj).forEach((element, i) => {
    let plant = {};
    let classification = {};
    let care = {};
    let characteristics = {};
    let regions = {};

    let splitObj = obj.selection1[i].selection4[5].name.split("\n");
    let splitFamObj = obj.selection1[i].selection4[3].name.split("\n");
    console.log(splitFamObj[1]);

    //Positions in array
    let familyPos = splitFamObj.indexOf("Family:");
    let genusPos = splitFamObj.indexOf("Genus:");
    let speciesPos = splitFamObj.indexOf("Species");
    let synonymPos = splitFamObj.indexOf("Synonym:");
    let categoryPos = splitObj.indexOf("Category:");
    let waterPos = splitObj.indexOf("Water Requirements:");
    let sunPos = splitObj.indexOf("Sun Exposure:");
    let foliagePos = splitObj.indexOf("Foliage:");
    let foliageColorPos = splitObj.indexOf("Foliage Color:");
    let heightPos = splitObj.indexOf("Height:");
    let spacingPos = splitObj.indexOf("Spacing:");
    let hardinessPos = splitObj.indexOf("Hardiness");
    let whereToGrowPos = splitObj.indexOf("Where to Grow:");
    let bloomColorPos = splitObj.indexOf("Bloom Color:");
    let bloomCharacteristics = splitObj.indexOf("Bloom Characteristics:");
    let bloomTimePos = splitObj.indexOf("Bloom Time:");
    let otherDetailsPos = splitObj.indexOf("Other details:");
    let soilPos = splitObj.indexOf("Soil pH requirements:");
    let patentInfoPos = splitObj.indexOf("Patent Information:");
    let propogationPos = splitObj.indexOf("Propagation Methods:");
    let seedCollectionPos = splitObj.indexOf("Seed Collecting:");
    let regionCollectionPos = splitObj.indexOf("Regional");

    // Contents of classification, care, characteristics and regions
    classification.name = obj.selection1[i].selection4[0].name;
    classification.family = splitFamObj[0].substr(7);
    classification.genusPos = splitFamObj[1].substr(7);
    classification.species = splitFamObj[2].substr(9);
    classification.synonym = splitFamObj[3].substr(8);
    classification.category = splitObj.slice(categoryPos + 1, waterPos);
    care.water = splitObj.slice(categoryPos, waterPos);
    care.sun = splitObj.slice(sunPos, foliagePos);
    care.height = splitObj.slice(heightPos, spacingPos);
    care.spacing = splitObj.slice(spacingPos, hardinessPos);
    care.hardiness = splitObj.slice(hardinessPos, whereToGrowPos);
    care.soil = splitObj.slice(soilPos, patentInfoPos);
    care.propogation = splitObj.slice(propogationPos, seedCollectionPos);
    care.seeds = splitObj.slice(seedCollectionPos, regionCollectionPos);
    characteristics.foliage = splitObj.slice(foliagePos, foliageColorPos);
    characteristics.foliageColor = splitObj.slice(foliageColorPos, heightPos);
    characteristics.bloomColor = splitObj.slice(
      bloomColorPos,
      bloomCharacteristics
    );
    characteristics.bloomTime = splitObj.slice(bloomTimePos, otherDetailsPos);
    characteristics.otherDetails = splitObj.slice(otherDetailsPos, soilPos);
    regions = splitObj.slice(regionCollectionPos);
    obj.selection1[i].selection4[0].name;
    plant.classification = classification;
    plant.care = care;
    plant.characteristics = characteristics;
    plant.regions = regions;
    console.log(classification);
    plants.push(plant);

    //end arr
  });
  const uniq = [...new Set(plants)];
  //console.log(uniq);
};
