import formatPrice from "../lib/price-format"


function displayCollection(res) {

    let counter = 1;
  
    res.forEach(function(item) {
      //retrieve images src urls
      let imageSrc = [];
      const images = item.images;
      images.forEach(function(i) {
        imageSrc.push(i.src);
      });
  
      //retrieve item price
      let itemPrice = [];
      const itemVariants = item.variants;
      itemVariants.forEach(function(x) {
        itemPrice.push(x.price);
      });
  
      let displayHere = document.querySelector(`#item-${counter}`);
  
      displayHere.innerHTML += `
                  <div class="image-mount">  
                    <a href="../product/${item.handle}.html">
                      <img src="${imageSrc[0]}" class="item-link" data-id="${
        item.id
      }" alt="${item.title}">
                    </a>  
                  </div>
                  <div class="item-name-price">
                      <p class="item-link" >
                        <a href="../product/${item.handle}.html"><em>${
        item.title
      }</em> - <strong>${formatPrice(itemPrice[0])}</strong>
                        </a>
                      </p>
                  </div>
                  `;
      counter++;
    });
  }

  export default displayCollection;