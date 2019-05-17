import client from "./shopify-client";

function fetchAll(n) {
  // Fetch all products in your shop
  return client.product
  // fetch the first n products
    .fetchAll(n)
    .catch(err => console.log(err));
}

export default fetchAll;