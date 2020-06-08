module.exports = () => {
  var obj = require("./Hard529.json");
  const axios = require("axios");

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

    //Positions in array

    let categoryPos = splitObj.indexOf("Category:");
    let waterPos = splitObj.indexOf("Water Requirements:");
    let sunPos = splitObj.indexOf("Sun Exposure:");
    let foliagePos = splitObj.indexOf("Foliage:");
    let foliageColorPos = splitObj.indexOf("Foliage Color:");
    let heightPos = splitObj.indexOf("Height:");
    let spacingPos = splitObj.indexOf("Spacing:");
    let hardinessPos = splitObj.indexOf("Hardiness:");
    let whereToGrowPos = splitObj.indexOf("Where to Grow:");
    let bloomColorPos = splitObj.indexOf("Bloom Color:");
    let bloomCharacteristics = splitObj.indexOf("Bloom Characteristics:");
    let bloomTimePos = splitObj.indexOf("Bloom Time:");
    let otherDetailsPos = splitObj.indexOf("Other details:");
    let soilPos = splitObj.indexOf("Soil pH requirements:");
    let patentInfoPos = splitObj.indexOf("Patent Information:");
    let propogationPos = splitObj.indexOf("Propagation Methods:");
    // collectionMethod
    let seedCollectionPos = splitObj.indexOf("Seed Collecting:");
    let regionCollectionPos = splitObj.indexOf("Regional");

    // Contents of classification, care, characteristics and regions
    classification.name = obj.selection1[i].selection4[0].name;
    classification.family = splitFamObj[0].substr(7).replace("(Info)", "");
    classification.genusPos = splitFamObj[1].substr(7).replace("(Info)", "");
    classification.species = splitFamObj[2].substr(9).replace("(Info)", "");
    classification.synonym = splitFamObj[3].substr(8).replace("(Info)", "");
    classification.category = splitObj.slice(categoryPos + 1, waterPos).join();

    care.water = splitObj.slice(categoryPos + 1, waterPos).join();
    care.sun = splitObj.slice(sunPos + 1, foliagePos).join();
    care.height = splitObj.slice(heightPos + 1, spacingPos).join();
    care.spacing = splitObj.slice(spacingPos + 1, hardinessPos).join();
    care.hardiness = splitObj.slice(hardinessPos + 1, whereToGrowPos).join();
    care.soil = splitObj.slice(soilPos + 1, patentInfoPos).join();
    care.propogation = splitObj
      .slice(propogationPos + 1, seedCollectionPos)
      .join();

    care.seeds = splitObj
      .slice(seedCollectionPos + 1, regionCollectionPos)
      .join();
    characteristics.foliage = splitObj
      .slice(foliagePos + 1, foliageColorPos)
      .join();

    characteristics.foliageColor = splitObj
      .slice(foliageColorPos + 1, heightPos)
      .join();

    characteristics.bloomColor = splitObj
      .slice(bloomColorPos + 1, bloomCharacteristics)
      .join();

    characteristics.bloomTime = splitObj
      .slice(bloomTimePos + 1, otherDetailsPos)
      .join();

    characteristics.otherDetails = splitObj
      .slice(otherDetailsPos + 1, soilPos)
      .join();

    regions = splitObj.slice(regionCollectionPos + 2);
    obj.selection1[i].selection4[0].name;
    plant.classification = classification;
    plant.care = care;
    plant.characteristics = characteristics;
    plant.regions = regions;
    plants.push(plant);
    //end arr
  });
  const uniq = [...new Set(plants)];
  uniq.forEach(async (el) => {
    await axios
      .post("http://localhost:5000/plant", {
        name: el.classification.name,
        family: el.classification.family,
        genus: el.classification.genus,
        species: el.classification.species,
        synonym: el.classification.synonym,
        water: el.care.water,
        category: el.classification.category,
        sun: el.care.sun,
        height: el.care.height,
        spacing: el.care.spacing,
        hardiness: el.care.hardiness,
        soil: el.care.soil,
        propogation: el.care.propogation,
        collectionMethod: el.care.seeds,
        foliage: el.care.foliage,
        foliageColor: el.care.foliageColor,
        bloomColor: el.characteristics.bloomColor,
        bloomTime: el.characteristics.bloomTime,
        otherDetails: el.characteristics.otherDetails,
        regions: el.regions,
      })
      .then((res) => {
        console.log(`statusCode: ${res.statusCode}`);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
