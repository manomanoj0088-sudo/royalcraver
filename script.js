document.addEventListener("DOMContentLoaded", () => {
  function setupSlider(wrapperId, prevBtnId, nextBtnId) {
    const wrapper = document.getElementById(wrapperId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);

    if (!wrapper || !prevBtn || !nextBtn) {
      console.log("Missing IDs:", wrapperId, prevBtnId, nextBtnId);
      return;
    }

    const scrollAmount = 350;

    nextBtn.addEventListener("click", () => {
      wrapper.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    prevBtn.addEventListener("click", () => {
      wrapper.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
  }

  // SLIDERS
  setupSlider("nonvegCardsWrapper", "nonvegPrevBtn", "nonvegNextBtn");
  setupSlider("vegCardsWrapper", "vegPrevBtn", "vegNextBtn");
  setupSlider("dessertCardsWrapper", "dessertPrevBtn", "dessertNextBtn");
  setupSlider("drinksCardsWrapper", "drinksPrevBtn", "drinksNextBtn");

  // ✅ CART
  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

  function saveCart() {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }

  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const itemName = btn.dataset.name;
      const itemPrice = Number(btn.dataset.price);
      const itemImg = btn.dataset.img;

      if (!itemName || !itemPrice || !itemImg) {
        console.log("Missing data attributes in button!");
        return;
      }

      const existingItem = cart.find((item) => item.name === itemName);

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        cart.push({
          name: itemName,
          price: itemPrice,
          img: itemImg,
          qty: 1,
        });
      }

      saveCart();
      alert(itemName + " added to cart!");

        // CART DISPLAY
  const cartItemsDiv = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const clearCartBtn = document.getElementById("clearCartBtn");

  function renderCart() {
    cartItemsDiv.innerHTML = "";

    if (cart.length === 0) {
      cartItemsDiv.innerHTML = "<p>Your cart is empty 😅</p>";
      cartTotal.innerText = "Total: ₹0";
      return;
    }

    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.qty;

      cartItemsDiv.innerHTML += `
        <div class="cart-item">
          <img src="${item.img}" alt="${item.name}">
          <div style="flex:1;">
            <h4>${item.name}</h4>
            <p>₹${item.price} × ${item.qty}</p>
          </div>
          <button class="remove-btn" data-index="${index}">Remove</button>
        </div>
      `;
    });

    cartTotal.innerText = "Total: ₹" + total;

    // Remove buttons
    document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = btn.dataset.index;
        cart.splice(index, 1);
        saveCart();
        renderCart();
      });
    });
  }

  // Clear cart button
  clearCartBtn.addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCart();
  });

  // Show cart items on page load
  renderCart();

    });
  });
});


