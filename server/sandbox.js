/* eslint-disable no-console, no-process-exit */

const dedicatedbrand = require('./eshops/dedicatedbrand');
const montLimart = require('./eshops/Montlimart');
//const circleSports = require('./eshops/CircleSports');

async function sandbox (eshop = 'https://www.montlimart.com/101-t-shirts') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

    const products = await montLimart.scrape(eshop);

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) { 
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
