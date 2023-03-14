/* eslint-disable no-console, no-process-exit */

const dedicatedbrand = require('./eshops/dedicatedbrand');
const montLimart = require('./eshops/Montlimart');
const circleSports = require('./eshops/CircleSportswear');

link1 = 'https://www.dedicatedbrand.com/en/men/news'
link2 = 'https://www.montlimart.com/101-t-shirts'
link3 = 'https://shop.circlesportswear.com/collections/t-shirts-homme'

scrapeTarget1 = dedicatedbrand;
scrapeTarget2 = montLimart;
scrapeTarget3 = circleSports;


async function sandbox (eshop = link2) {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

    const products = await scrapeTarget2.scrape(eshop);

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
