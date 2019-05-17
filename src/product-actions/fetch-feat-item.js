import client from "../shopify-client";

function fetchFeaturedItem(id) {
    // Fetch a single product by ID
    return client.product
      .fetch(id)
      .catch(err => console.log(err));
  }


  export default fetchFeaturedItem;