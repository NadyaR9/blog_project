const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const createModel = require('./createModel');
const createUi = require('./createUi');
const createPublicApi = require('./createPublicApi');

module.exports = async (layer, slice) => {
  try {
    await fs.mkdir(resolveRoot('src', layer, slice));
  } catch (error) {
    console.log(`failed to create folder for slice - ${slice}`);
  }

  await createModel(layer, slice);
  await createUi(layer, slice);
  await createPublicApi(layer, slice);
};
