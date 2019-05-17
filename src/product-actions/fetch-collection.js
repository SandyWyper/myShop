import client from "../shopify-client";

function fetchCollection() {
    //retrieve the relevant id from the html page
  const collectionSection = document.querySelector("#collection-section");
  const collectionId = collectionSection.dataset.id;
  // Fetch a single collection by ID, including its products
return  client.collection
    .fetchWithProducts(collectionId)
    .catch(err => console.log(err));
}

export default fetchCollection;
