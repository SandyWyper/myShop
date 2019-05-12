"use-strict";

import Client from "shopify-buy";
import ids from "./ids";

const idTags = ids.ids;

const client = Client.buildClient({
  domain: "sandywyper-co-uk.myshopify.com",
  storefrontAccessToken: "8b066968ace6c0f3399eae24531d0293"
});

function readyPage() {
  document.querySelector(".wrapper").addEventListener("click", handleClick);

  // sets listeners for buttons requiring js actions
  // document.querySelector("#open-menu").addEventListener("click", openSideMenu);
  // document.querySelector("#close-menu").addEventListener("click", closeSideMenu);

  displayFeaturedCollection(idTags.musicCollection);
  fetchFeaturedItem(idTags.xmasToy);
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

// // nav bar transform
// // --------------------------------------------------------------------------------
// function checkScroll(e) {
//     //monitors the scroll position of the page to toggle a class that changes the nav-bar
//     const scrolls = window.scrollY

//     if (scrolls > (headerLarge.scrollHeight - 100) && headerLarge.classList.contains("reveal")) {
//         headerLarge.classList.toggle('reveal');
//         headerSlim.classList.toggle('reveal');
//     } else if (scrolls < (headerLarge.scrollHeight - 100) && !headerLarge.classList.contains("reveal")) {
//         headerLarge.classList.toggle('reveal');
//         headerSlim.classList.toggle('reveal');
//     }

// }

//scroll event throttler to stop the browser from overworking
// let scrollTimeout;

// function scrollThrottler() {
//     // ignore scroll events as long as an checkScroll execution is in the queue
//     if (!scrollTimeout) {
//         scrollTimeout = setTimeout(function() {
//             scrollTimeout = null;
//             checkScroll();

//             // The checkScroll will execute at a rate of
//         }, 200);
//     }
// }

// ------------------------------------------------------------------------------------
// JQuery smoothScroll  -- thanks to Traversy Media

// function smoothScroll(e) {
//     if (this.hash !== '') {
//         e.preventDefault();

//         const hash = this.hash;

//         $('html, body').animate({
//             scrollTop: $(hash).offset().top
//         }, 800);
//     }
// }

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
                  <img src="${imageSrc[0]}" class="item-link" data-id="${
      item.id
    }" alt="${item.title}">
                </div>
                <div class="item-name-price">
                    <p class="item-link" ><em>${
                      item.title
                    }</em> - <strong> &pound;${Math.round(itemPrice[0])}</p>
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
        <div class="item-image">
          <img src="${imageSrc[0]}" class="item-link" data-id="${item.id}" alt="${item.title}">
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
            <p class="full-details item-link">Full details &rarr;</p>
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

function handleClick(event) {
  event.preventDefault();

  // if the click target has a class of 'item-link' then extract id of that item and pass to next func.
  if (event.target.classList.contains("item-link")) {
    // console.log("testing");
    let productLink = event.target;
    // console.log(productLink.dataset.id);
    let id = productLink.dataset.id;
    
    fetchThisItem(id);
  }
}



function fetchThisItem(id) {
  // Fetch a single product by ID
  client.product
    .fetch(id)
    .then(product => {
      // Do something with the product
      displayThisItem(product);
    })
    .catch(err => console.log(err));
}

async function displayThisItem(item) {
  await moveWindow();
  
  console.log(item);
}

// console.log(item);

// let imageSrc = [];

// if (item.images) {
//   let images = item.images;
//   images.forEach(function(i) {
//     imageSrc.push(i.src);
//   });
// }

// //retrieve item price
// let itemPrice = [];
// let itemVariants = item.variants;
// itemVariants.forEach(function(x) {
//   itemPrice.push(x.price);
// });

// console.log(itemPrice);

// let itemSection = document.querySelector('#item-section');

// console.log(itemSection);

// itemSection.innerHTML += `
//       <div class="item-image">
//         <img src="${imageSrc[0]}" class="item-link" data-id="${item.id}" alt="${item.title}">
//       </div>
//       <div class="f-item-details">
//         <div class="f-title-price">
//           <h2>${item.title}</h2>
//           <h3>&pound;${itemPrice[0]}</h3>
//           <p>Tax Included.</p>
//           <p>________</p>
//         </div>
//         <div class="buy-buttons">
//           <button class="btn1">ADD TO CART</button>
//           <button class="btn2">BUY NOW</button>
//         </div>
//         <div>
//           <p class="full-details item-link">Full details &rarr;</p>
//           <div class="social">
//             <p><i class="fab fa-facebook-f"></i> Share<p>
//                   &nbsp;
//             <p><i class="fab fa-twitter"></i> Tweet</p>
//                   &nbsp;
//             <p><i class="fab fa-pinterest-p"></i> Pin it</p>
//           </div>
//         </div>
//       </div>
//     `;

function moveWindow() {
  window.location.href = "product.html";
}

window.onload = readyPage();
// window.addEventListener("scroll", scrollThrottler);
