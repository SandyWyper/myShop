"use-strict";

import Client from "shopify-buy";
import ids from "./ids";

const idTags = ids.ids;

const client = Client.buildClient({
  domain: "sandywyper-co-uk.myshopify.com",
  storefrontAccessToken: "8b066968ace6c0f3399eae24531d0293"
});

function readyPage() {
  // console.log(window.location.pathname === "/");

  if (window.location.pathname === "/") {
    // document.querySelector(".wrapper").addEventListener("click", handleClick);

    // sets listeners for buttons requiring js actions
    // document.querySelector("#open-menu").addEventListener("click", openSideMenu);
    // document.querySelector("#close-menu").addEventListener("click", closeSideMenu);

    displayFeaturedCollection(idTags.musicCollection);
    fetchFeaturedItem(idTags.xmasToy);
  } else if (window.location.pathname.substring(1, 8) === "product") {
    fetchProductInfo();
  } else if (window.location.pathname.substring(1, 11) === "collection") {
    console.log("yup, this is a collection page");
  }
}

// Fetch all products in your shop
// client.product.fetchAll().then((products) => {
//     // Do something with the products
//     console.log(products);
// }).catch( (err) => console.log(err));

function openSideMenu() {
  // reveal the side menu.
  document.querySelector("#side-menu").style.width = "150px";
  document.querySelector("#wrapper").style.marginRight = "150px";
}

function closeSideMenu() {
  // close the side menu
  document.querySelector("#side-menu").style.width = "0";
  document.querySelector("#wrapper").style.marginRight = "0";
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

function displayFeaturedItem(item) {
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
        <button class="btn1">ADD TO CART</button>
        <button class="btn2">BUY NOW</button>
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

function displayThisItem(item) {
  let imageSrc = [];

  // fetch item's images
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
  let itemSection = document.querySelector("#item-section");

  itemSection.innerHTML += `
        <div class="product-image">
          <img src="${imageSrc[0]}" alt="${item.title}">
        </div>
        <div class="product-details">
          <div class="product-price">
            <h1>${item.title}</h1>
            <h3 class="price">&pound;${itemPrice[0]}</h3>
            <p class="tax">Tax Included.</p>
            <p>________</p>
          </div>
          <div class="buy-buttons">
            <button class="btn1">ADD TO CART</button>
            <button class="btn2">BUY NOW</button>
          </div>
          <div>
            <div class="product-description">
              ${item.descriptionHtml}
            </div>
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

window.onload = readyPage();
