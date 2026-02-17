document.addEventListener("DOMContentLoaded", () => {

  // ----------- LOAD CART -----------
  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

  // ----------- ELEMENTS -----------
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const cartTitle = document.getElementById("cartTitle");

  const subtotalPrice = document.getElementById("subtotalPrice");
  const gstPrice = document.getElementById("gstPrice");
  const totalPrice = document.getElementById("totalPrice");

  const emptyCartBox = document.getElementById("emptyCartBox");
  const clearCartBtn = document.getElementById("clearCartBtn");

  const cartCountBadge = document.getElementById("cartCountBadge");

  // ----------- SAVE CART -----------
  function saveCart() {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }

  // ----------- COUNT ITEMS -----------
  function getCartCount() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }

  // ----------- UPDATE NAV COUNT -----------
  function updateCartBadge() {
    const count = getCartCount();
    cartCountBadge.textContent = count;

    if (count === 0) {
      cartCountBadge.style.display = "none";
    } else {
      cartCountBadge.style.display = "inline-block";
    }
  }

  // ----------- CALCULATE TOTALS -----------
  function updateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const gst = subtotal * 0.05;
    const total = subtotal + gst;

    subtotalPrice.textContent = "₹" + subtotal.toFixed(0);
    gstPrice.textContent = "₹" + gst.toFixed(0);
    totalPrice.textContent = "₹" + total.toFixed(0);
  }

  // ----------- RENDER CART -----------
  function renderCart() {
    cartItemsContainer.innerHTML = "";

    cartTitle.textContent = `My Cart (${getCartCount()})`;

    if (cart.length === 0) {
      emptyCartBox.style.display = "block";
      clearCartBtn.style.display = "none";
    } else {
      emptyCartBox.style.display = "none";
      clearCartBtn.style.display = "inline-block";
    }

    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "cart-item";

      div.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        
        <div class="item-info">
          <h4>${item.name}</h4>
          <p>₹${item.price} × ${item.qty}</p>
        </div>

        <div class="item-actions">
          <div class="qty-box">
            <button class="minus-btn" data-index="${index}">-</button>
            <span>${item.qty}</span>
            <button class="plus-btn" data-index="${index}">+</button>
          </div>
          <button class="remove-btn" data-index="${index}">Remove</button>
        </div>
      `;

      cartItemsContainer.appendChild(div);
    });

    updateTotals();
    updateCartBadge();
  }

  // ----------- PLUS / MINUS / REMOVE EVENTS -----------
  cartItemsContainer.addEventListener("click", (e) => {
    const index = e.target.dataset.index;

    if (index === undefined) return;

    // PLUS
    if (e.target.classList.contains("plus-btn")) {
      cart[index].qty += 1;
      saveCart();
      renderCart();
    }

    // MINUS
    if (e.target.classList.contains("minus-btn")) {
      cart[index].qty -= 1;

      if (cart[index].qty <= 0) {
        cart.splice(index, 1);
      }

      saveCart();
      renderCart();
    }

    // REMOVE
    if (e.target.classList.contains("remove-btn")) {
      cart.splice(index, 1);
      saveCart();
      renderCart();
    }
  });

  // ----------- CLEAR CART -----------
  clearCartBtn.addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCart();
  });

  // ----------- PLACE ORDER -----------
  document.getElementById("placeOrderBtn").addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    alert("Order placed successfully!🍔🍕 You will receive your order soon.");
    cart = [];
    saveCart();
    renderCart();
  });

  // ----------- CHANGE ADDRESS -----------
  document.getElementById("changeAddressBtn").addEventListener("click", () => {
    const newAddress = prompt("Enter new delivery address:");
    if (newAddress && newAddress.trim() !== "") {
      document.getElementById("deliveryAddress").textContent = newAddress;
    }
  });

  // FIRST LOAD
  
  renderCart();
  document.querySelector(".newsletter-form").addEventListener("submit", function(e){
  e.preventDefault();
  alert("Thanks for subscribing!");
  this.reset();
});

});
