"use-strict";

import client from "./shopify-client";
import ids from "./ids";
import productActions from "./product-actions";
import render from "./render";
import cart from "./cart";

function readyPage() {
  //  localStorage.removeItem('sandy-shop-checkoutId');

  // every time the page loads check for session
  checkCart();

  document.querySelector("#open-cart").addEventListener("click", cart.open);
  document.querySelector("#close-cart").addEventListener("click", cart.close);
  document.querySelector("body").addEventListener("click", handleClick);


  // depending on the page pathname -> display corresponding content
  if (window.location.pathname === "/myShop/") {
    productActions
      .fetchFeaturedCollection(ids.musicCollection)
      .then(collection => {
        render.displayFeaturedCollection(collection.products);
      });
    productActions
      .fetchFeaturedItem(ids.xmasToy)
      .then(render.displayFeaturedProduct);
  } else if (window.location.pathname.substring(1, 15) === "myShop/product") {
    productActions.fetchProduct().then(render.displayProduct);
  } else if (
    window.location.pathname.substring(1, 18) === "myShop/collection"
  ) {
    productActions.fetchCollection().then(collection => {
      render.displayCollection(collection.products);
    });
  } else if (window.location.pathname.substring(1, 6) === "allPr") {
    // if number of porducts is ommited then the default is 20
    productActions.fetchAll(numberOfProducts).then(render.displayAll);
  }
}

//   //dev version
//   if (window.location.pathname === "/") {
//     // fetchFeaturedCollection(idTags.musicCollection);
//     productActions
//       .fetchFeaturedCollection(ids.musicCollection)
//       .then(collection => {
//         render.displayCollection(collection.products);
//       })
//     productActions
//       .fetchFeaturedItem(ids.xmasToy)
//       .then(render.displayFeaturedProduct);
//   } else if (window.location.pathname.substring(1, 8) === "product") {
//     productActions.fetchProduct().then(render.displayProduct);
//   } else if (window.location.pathname.substring(1, 11) === "collection") {
//     productActions.fetchCollection().then(collection => {
//       render.displayCollection(collection.products);
//     });
//   } else if (window.location.pathname.substring(1, 6) === "allPr") {
//     const numberOfProducts = 30;
//     // if number of porducts is ommited then the default is 20
//     productActions.fetchAll(numberOfProducts).then(render.displayAll);
//   }
// }

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

function handleClick(event) {
  // store click target
  const buttonClicked = event.target;

  if (event.target.classList.contains("add-to-cart")) {
    const id = buttonClicked.dataset.id;

    cart
      .addItem(id)
      .then(cart.renderCart)
      .then(cart.open);
  } else if (event.target.classList.contains("buy-now")) {
    const id = buttonClicked.dataset.id;

    cart.addItemAndCheckout(id).then(checkout => {
      window.location.href = `${checkout.webUrl}`;
    });
  } else if (event.target.classList.contains("less")) {
    const id = buttonClicked.dataset.id;

    cart.remove(id).then(cart.renderCart);
  } else if (event.target.classList.contains("checkout")) {
    const url = buttonClicked.dataset.url;

    window.location.href = `${url}`;
  }
}

window.onload = readyPage;
