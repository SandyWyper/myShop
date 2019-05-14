function displayThisItem(item) {
  let imageSrc = [];
  // console.log(item);

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

  //TODO: handle cases with multiple variants
  let firstVariant = item.variants[0];
  let variantId = firstVariant.id;
  let itemSection = document.querySelector("#item-section");

console.log(item.id, variantId);

  itemSection.innerHTML += `
          <div class="product-image">
            ${item.images.map(image => {
              return `<img src="${image.src}" alt="${image.altText}">`;
            })}
          </div>
          <div class="product-details">
            <div class="product-price">
              <h1>${item.title}</h1>
              <h3 class="price">&pound;${itemPrice[0]}</h3>
              <p class="tax">Tax Included.</p>
              <p>________</p>
            </div>
            <div class="buy-buttons">
            <button class="btn1 add-to-cart" data-id="${variantId}">ADD TO CART</button>
            <button class="btn2 buy-now" data-id="${variantId}">BUY NOW</button>
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

export default  displayThisItem ;
