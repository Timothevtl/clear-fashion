/* eslint-disable no-console, no-process-exit */

const dedicatedbrand = require('./eshops/dedicatedbrand');
const montLimart = require('./eshops/Montlimart');
const circleSports = require('./eshops/CircleSportswear');

//link = 'https://www.dedicatedbrand.com/en/men/news'
link = 'https://www.montlimart.com/101-t-shirts'
//link = 'https://shop.circlesportswear.com/collections/t-shirts-homme'

//scrapeTarget = dedicatedbrand;
scrapeTarget = montLimart;
//scrapeTarget = circleSports;


async function sandbox (eshop = link) {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

    const products = await scrapeTarget.scrape(eshop);

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
