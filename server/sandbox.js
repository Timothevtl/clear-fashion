/* eslint-disable no-console, no-process-exit */

const dedicatedbrand = require('./eshops/dedicatedbrand');
const montLimart = require('./eshops/Montlimart');
const circleSports = require('./eshops/CircleSportswear');

async function sandbox (eshop = 'https://shop.circlesportswear.com/collections/t-shirts-homme') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

    const products = await circleSports.scrape(eshop);

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
