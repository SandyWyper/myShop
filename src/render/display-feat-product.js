
function displayFeaturedProduct(item) {

    let imageSrc = [];

    if (item.images) {
      const images = item.images;
      images.forEach(function(i) {
        imageSrc.push(i.src);
      });
    }

    //retrieve item price
    let itemPrice = [];
    const itemVariants = item.variants;
    itemVariants.forEach(function(x) {
      itemPrice.push(x.price);
    });
  
    // get the first variants id
    const firstVariant = item.variants[0];
    const variantId = firstVariant.id;
  
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

  export default displayFeaturedProduct;