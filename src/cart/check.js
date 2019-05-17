import client from "../shopify-client";


function checkCart() {
    const checkoutId = localStorage.getItem("sandy-shop-checkoutId");
    
    if (checkoutId === null) {
      client.checkout
        .create()
        .then(function(cart) {
          //do something with cart
          localStorage.setItem("sandy-shop-checkoutId", cart.id); // Store the ID in localStorage
        })
        .catch(err => console.log("problem making cart", err));
    } else {
      client.checkout
        .fetch(checkoutId)
        .then(cart.renderCart)
        .catch(err => console.log("problem fetching old cart", err));
    }
  }

  export default checkCart;