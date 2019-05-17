function displayAll(products) {
  products.forEach(function(p) {
    const pImage = p.images[0].src;
    const pPrice = p.variants[0].price;
    const displaySpace = document.querySelector("#products-section");

    displaySpace.innerHTML += `
      <div class="each-product">
        <div class="image-mount">
          <a href="../product/${p.handle}.html">
            <img src="${pImage}" class="item-link" data-id="${p.id}" alt="${
      p.title
    }">
          </a>  
        </div>
        <div class="item-name-price">
          <p class="item-link p-text" >
            <a href="../product/${p.handle}.html">
              <em>${p.title}</em> - <strong> &pound;${Math.round(
      pPrice
    )}</strong>
            </a>
          </p>
        </div>
      </div>
    `;
  });
}

export default displayAll;
