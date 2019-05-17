import client from "../shopify-client";

function remove(id) {
  const checkoutId = localStorage.getItem("sandy-shop-checkoutId");
  const lineItemIdsToRemove = [id];

  // Remove an item from the checkout
  return client.checkout
    .removeLineItems(checkoutId, lineItemIdsToRemove)
    .catch(err => console.log("Problem removing item from cart", err));
}

export default remove;