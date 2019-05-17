import client from "./shopify-client";

function fetchProduct() {
    //get the relevant id from the corrisponding html page
    const itemSection = document.querySelector("#item-section");
    const productId = itemSection.dataset.id;
    //   // Fetch a single product by ID
    return client.product
      .fetch(productId)
      .catch(err => console.log("fetching error", err));
  }

  export default fetchProduct;