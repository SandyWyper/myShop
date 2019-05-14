"use-strict";

import Client from "shopify-buy";
import ids from "./ids";
import displayThisItem from "./displayItem";

const idTags = ids.ids;

const client = Client.buildClient({
  domain: "sandywyper-co-uk.myshopify.com",
  storefrontAccessToken: "8b066968ace6c0f3399eae24531d0293"
});

const checkoutId = localStorage.getItem("sandy-shop-checkoutId");

function checkCart() {
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
      .then(function(cart) {
        // console.log(cart);
        populateCartMenu(cart);
        // do something with cart
      })
      .catch(err => console.log("problem fetching old cart", err));
  }
}

function readyPage() {
  //  localStorage.removeItem('sandy-shop-checkoutId');
  checkCart();
  document.querySelector("#open-cart").addEventListener("click", openCart);
  document.querySelector("#close-cart").addEventListener("click", closeCart);

  document.querySelector("body").addEventListener("click", handleClick);
console.log(window.location.pathname);
  if (window.location.pathname.length < 2 ) {
    // sets listeners for buttons requiring js actions

    displayFeaturedCollection(idTags.musicCollection);
    fetchFeaturedItem(idTags.xmasToy);
  } else if (window.location.pathname.substring(1, 8) === "product") {
    fetchProductInfo();
  } else if (window.location.pathname.substring(1, 11) === "collection") {
    console.log("yup, this is a collection page");
  } 
  // Fetch all products in your shop
  client.product
    .fetchAll()
    .then(products => {
      // Do something with the products
      // console.log(products);
    })
    .catch(err => console.log(err));
}

function openCart() {
  // reveal the side menu.
  document.querySelector("#side-menu").style.width = "400px";
  // document.querySelector("#body").style.left = "400px";
}

function closeCart() {
  // close the side menu
  document.querySelector("#side-menu").style.width = "0";
  // document.querySelector("#body").style.marginRight = "0";
}

function displayFeaturedCollection(id) {
  // Fetch a single collection by ID, including its products
  client.collection
    .fetchWithProducts(id)
    .then(collection => {
      // Do something with the collection
      displayCollection(collection.products);
    })
    .catch(err => console.log(err));
}

function displayCollection(res) {
  let counter = 1;

  res.forEach(function(item) {
    //retrieve images src urls
    let imageSrc = [];
    let images = item.images;
    images.forEach(function(i) {
      imageSrc.push(i.src);
    });

    //retrieve item price
    let itemPrice = [];
    let itemVariants = item.variants;
    itemVariants.forEach(function(x) {
      itemPrice.push(x.price);
    });

    let displayHere = document.querySelector(`#item-${counter}`);

    displayHere.innerHTML += `
                <div class="image-mount">  
                  <a href="./product/${item.handle}.html">
                    <img src="${imageSrc[0]}" class="item-link" alt="${
      item.title
    }">
                  </a>  
                </div>
                <div class="item-name-price">
                    <p class="item-link" >
                      <a href="./product/${item.handle}.html"><em>${
      item.title
    }</em> - <strong> &pound;${Math.round(itemPrice[0])}
                      </a>
                    </p>
                </div>
                `;
    counter++;
  });
}

function fetchFeaturedItem(id) {
  // Fetch a single product by ID
  client.product
    .fetch(id)
    .then(product => {
      // Do something with the product
      displayFeaturedItem(product);
    })
    .catch(err => console.log(err));
}

function getVariantBuyUrl(id) {
  // Fetch a single product by ID

  client.product
    .fetch(id)
    .then(product => {
      console.log(product);
    })
    .catch(err => console.log(err));
}

function displayFeaturedItem(item) {
  // console.log(item);
  let imageSrc = [];
  if (item.images) {
    let images = item.images;
    images.forEach(function(i) {
      imageSrc.push(i.src);
    });
  }
  //retrieve item price
  let itemPrice = [];
  let itemVariants = item.variants;
  itemVariants.forEach(function(x) {
    itemPrice.push(x.price);
  });

  // get the first variants id
  let firstVariant = item.variants[0];
  let variantId = firstVariant.id;

  //get variant for buy-now url
  // const buyUrl = getVariantBuyUrl(variantId);
  // console.log(firstVariant.id);

  let itemSection = document.querySelector("#featured-item");

  itemSection.innerHTML += `
    <div class="featured-item-image">
      <a href="./product/${item.handle}.html">
        <img src="${imageSrc[0]}" class="item-link" alt="${item.title}">
      </a>
    </div>
    <div class="f-item-details">
      <div class="f-title-price">
        <h2>${item.title}</h2>
        <h3>&pound;${itemPrice[0]}</h3>
        <p>Tax Included.</p>
        <p>________</p>
      </div>
      <div class="buy-buttons">
        <button class="btn1 add-to-cart" data-id="${variantId}">ADD TO CART</button>
        <button class="btn2 buy-now" data-id="${variantId}">BUY NOW</button>
      </div>
      <div>
        <p class="full-details item-link"><a href="./product/${
          item.handle
        }.html">Full details &rarr;</a></p>
        <div class="social">
          <p><i class="fab fa-facebook-f"></i> Share<p>
                &nbsp;
          <p><i class="fab fa-twitter"></i> Tweet</p>
                &nbsp;
          <p><i class="fab fa-pinterest-p"></i> Pin it</p>
        </div>
      </div>
    </div>
  `;
}

function fetchProductInfo() {
  let itemSection = document.querySelector("#item-section");
  let productId = itemSection.dataset.id;
  //   // Fetch a single product by ID
  client.product
    .fetch(productId)
    .then(product => {
      // Do something with the product
      displayThisItem(product);
    })
    .catch(err => console.log("fetching error", err));
}

function handleClick(event) {
  // if the click target has a class of 'item-link' then extract id of that item and pass to next func.
  if (event.target.classList.contains("add-to-cart")) {
    let buttonClicked = event.target;
    let id = buttonClicked.dataset.id;

    addItemToCart(id);
  } else if (event.target.classList.contains("buy-now")) {
    let buttonClicked = event.target;
    let id = buttonClicked.dataset.id;

    // console.log("click");
    addItemAndCheckout(id);
  } else if (event.target.classList.contains("less")) {
    let buttonClicked = event.target;
    let id = buttonClicked.dataset.id;
    removeItemFromCart(id);
  } else if (event.target.classList.contains("checkout")) {
    let buttonClicked = event.target;
    let url = buttonClicked.dataset.url;
    console.log(url);
    window.location.href = `${url}`;
  }
}

function removeItemFromCart(id) {
  const lineItemIdsToRemove = [id];

  // Remove an item from the checkout
  client.checkout
    .removeLineItems(checkoutId, lineItemIdsToRemove)
    .then(checkout => {
      // Do something with the updated checkout
      populateCartMenu(checkout);
      // console.log(checkout.lineItems);
    });
}
function addItemAndCheckout(id) {
  const lineItems = {
    variantId: id,
    quantity: 1
  };
  client.checkout
    .addLineItems(checkoutId, lineItems)
    .then(checkout => {
      window.location.href = `${checkout.webUrl}`;
    })
    .catch(err => console.log("problem adding item to cart", err));
}

function addItemToCart(id) {
  const lineItems = {
    variantId: id,
    quantity: 1
  };

  client.checkout
    .addLineItems(checkoutId, lineItems)
    .then(checkout => {
      populateCartMenu(checkout);
      openCart();
    })
    .catch(err => console.log("problem adding item to cart", err));
}
// addItemToCart(id);}

function populateCartMenu(cart) {
  let lineItems = cart.lineItems;
  let cartField = document.querySelector("#cart-contents");

  if (lineItems.length < 1) {
    cartField.innerHTML = `
    <p>Your cart is currently empty.</p>
    `;
  } else {
    cartField.innerHTML = `
    ${lineItems.map(i => {
      let eachItemImage = i.variant.image;
      let eachPrice = i.variant.price;

      return `
      <div class="cart-item">
        <img src="${eachItemImage.src}" alt="cart-item-image">
        <div class="title-quantity">
          <h5>${i.title}</h5>
          <div class="item-price-total">
            <p>Quantity : ${i.quantity}</p>
            <p class="less" data-id="${i.id}">remove</p>
            <p><strong>&pound;${eachPrice * i.quantity}</strong></p>
          </div>
        </div>
      </div>
      `;
    })}
    <div class="go-to-checkout">
      <div class="subtotal">
        <h3>subtotal</h3>
        <h3>&pound;${cart.subtotalPrice}</h3>
      </div>
      <p>Tax included and shipping calculated at checkout</p>
      <button class="checkout" data-url="${
        cart.webUrl
      }">checkout &rarr;</button>
    </div> 
    `;
  }
}

window.onload = readyPage();
