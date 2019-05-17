import client from "./shopify-client";

function fetchFeaturedItem(id) {
    // Fetch a single product by ID
    return client.product
      .fetch(id)
    //   .then(product => {
    //     // Do something with the product
    //     displayFeaturedItem(product);
    //   })
      .catch(err => console.log(err));
  }


  export default fetchFeaturedItem;