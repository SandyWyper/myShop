import client from "../shopify-client";

function addItemAndCheckout(id) {
  const checkoutId = localStorage.getItem("sandy-shop-checkoutId");
  const lineItems = {
    variantId: id,
    quantity: 1
  };
  return client.checkout
    .addLineItems(checkoutId, lineItems)
    .catch(err => console.log("problem adding item to cart", err));
}

export default addItemAndCheckout;
