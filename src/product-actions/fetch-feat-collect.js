import client from "./shopify-client";

function fetchFeaturedCollection(id) {
  // Fetch a single collection by ID, including its products
  return client.collection
    .fetchWithProducts(id)
    .catch(err => console.log(err));
}

export default fetchFeaturedCollection;