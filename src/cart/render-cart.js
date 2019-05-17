function renderCart(cart) {
    const lineItems = cart.lineItems;
    let cartField = document.querySelector("#cart-contents");
  
    if (lineItems.length < 1) {
      cartField.innerHTML = `
      <p>Your cart is currently empty.</p>
      `;
    } else {
      cartField.innerHTML = `
      ${lineItems.map(i => {
        const eachItemImage = i.variant.image;
        const eachPrice = i.variant.price;
  
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

  export default renderCart;