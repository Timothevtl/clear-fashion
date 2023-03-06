// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

/*
Description of the available api
GET https://clear-fashion-api.vercel.app/

Search for specific products

This endpoint accepts the following optional query string parameters:

- `page` - page of products to return
- `size` - number of products to return

GET https://clear-fashion-api.vercel.app/brands

Search for available brands list
*/

// current products on the page
let allProducts = [];
let currentProducts = [];
let currentPagination = {};
let favproducts = [];


// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectBrand = document.querySelector('#brand-filter');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const selectSort = document.querySelector('#sort-select');

const spanCurrentProducts = document.querySelector('#CurProducts');
const spanNewProducts = document.querySelector('#newProducts');
const spanP50Price = document.querySelector('#span50');
const spanP90Price = document.querySelector('#span90');
const spanP95Price = document.querySelector('#span95');
const spanDate = document.querySelector('#lastRelease');


const select50 = document.querySelector('#price-50');
const selectRecent = document.querySelector('#recent');



/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  allProducts = result;
  currentProducts = [...allProducts];
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @param  {String}  [brand=''] - brand name to filter by
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

/**
 * Render list of products
 * @param  {Array} products 
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}" target="_blank">${product.name}</a>
        <span>${product.price}</span>
        <button class="material-symbols-outlined" onclick="fav('${product.uuid}')">favorite</button>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};


/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');
  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;
  //counting new products
  const today = new Date();
  const twoWeeksAgo = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);
  const newProducts = allProducts.filter(product => new Date(product.released) >= twoWeeksAgo);

  const { p50, p90, p95 } = calculatePricePercentiles();
  const releaseDates = currentProducts.map(product => new Date(product.released));
  const mostRecentReleaseDate = new Date(Math.max.apply(null, releaseDates));

  spanP50Price.innerHTML = `${p50.toFixed(2)} €`;
  spanP90Price.innerHTML = `${p90.toFixed(2)} €`;
  spanP95Price.innerHTML = `${p95.toFixed(2)} €`;
  spanCurrentProducts.innerHTML = currentProducts.length;
  spanNbProducts.innerHTML = count;
  spanNewProducts.innerHTML = newProducts.length;


  spanDate.innerHTML = mostRecentReleaseDate.toLocaleDateString();

  const brands = [...new Set(currentProducts.map(product => product.brand))];
  const options = brands
    .map(brand => `<option value="${brand}">${brand}</option>`)
    .join('');

  selectBrand.innerHTML = `<option value="">All brands</option>${options}`;
  selectBrand.value = "";
};

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
};

const filterByBrand = brand => {
  currentProducts = allProducts.filter(product => product.brand === brand);
  render(currentProducts, currentPagination);
};

const filterByRecent = () => {
  currentProducts = allProducts.filter(product => {
    const releaseDate = new Date(product.released);
    const today = new Date();
    const diffTime = Math.abs(today - releaseDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 14;
  });
  render(currentProducts, currentPagination);
};

const filterReas = brand => {
  const priceFilter = allProducts.filter(product => product.price <= 50);
  render(priceFilter, {currentPage: 1, count: priceFilter.length, pageCount: 1});
};

const sortProducts = sortOption => {
  let sortedProducts = [...currentProducts];
  switch(sortOption) {
    case 'price-asc':
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case 'date-asc':
      sortedProducts = sortedProducts.filter(product => {
        const releaseDate = new Date(product.released);
        const today = new Date();
        const diffTime = Math.abs(today - releaseDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 14;
      });
      break;
    case 'date-desc':
      sortedProducts = sortedProducts.filter(product => {
        const releaseDate = new Date(product.released);
        const today = new Date();
        const diffTime = Math.abs(today - releaseDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 14;
      });
      break;
    default:
      break;
  }
  render(sortedProducts, {currentPage: 1, count: sortedProducts.length, pageCount: 1});
};

const calculatePricePercentiles = () => {
  const prices = currentProducts.map(product => product.price);
  const p50 = percentile(prices, 50);
  const p90 = percentile(prices, 90);
  const p95 = percentile(prices, 95);
  return { p50, p90, p95 };
};

const percentile = (arr, p) => {
  if (arr.length === 0) return 0;
  const k = Math.floor((arr.length - 1) * p / 100);
  return quickselect(arr, k);
};

const quickselect = (arr, k) => {
  if (arr.length === 0) return 0;
  if (arr.length === 1) return arr[0];
  const pivot = arr[Math.floor(Math.random() * arr.length)];
  const lows = arr.filter(x => x < pivot);
  const highs = arr.filter(x => x > pivot);
  const pivots = arr.filter(x => x === pivot);
  if (k < lows.length) {
    return quickselect(lows, k);
  } else if (k < lows.length + pivots.length) {
    return pivots[0];
  } else {
    return quickselect(highs, k - lows.length - pivots.length);
  }
};

function fav(products) {
  for(var i = 0; i < currentProducts.length; ++i){
    if((currentProducts[i].uuid).toString()===products && favproducts.includes(currentProducts[i])=== false){
      favproducts.push(currentProducts[i]);
    }
  }
  return favproducts;
}

function displayfav(){
  render(favproducts,currentPagination);
}


/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 */
selectShow.addEventListener('change', async (event) => {
  const products = await fetchProducts(currentPagination.currentPage, parseInt(event.target.value));

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

selectPage.addEventListener('change', async (event) => {
  const products = await fetchProducts(parseInt(event.target.value), undefined);

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

selectBrand.addEventListener('change', async (event) => {
  const selectedBrand = selectBrand.value;
  filterByBrand(selectedBrand);
});

  
selectSort.addEventListener('change', async (event) => {
  const selectedSort = selectSort.value;
  sortProducts(selectedSort);
});


document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});




