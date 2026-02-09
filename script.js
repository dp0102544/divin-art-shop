let cart = JSON.parse(localStorage.getItem("cart")) || [];

let cartCount = document.getElementById("cart-count");
let cartItems = document.getElementById("cart-items");
let totalPriceEl = document.getElementById("total-price");

/* =====================
   UPDATE CART UI
===================== */
function updateCartUI() {
    cartItems.innerHTML = "";
    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach((item, index) => {
        totalItems += item.qty;
        totalPrice += item.price * item.qty;

        let li = document.createElement("li");
        li.innerHTML = `
            <strong>${item.name}</strong> – ₹${item.price} × ${item.qty}
            <button onclick="changeQty(${index}, -1)">−</button>
            <button onclick="changeQty(${index}, 1)">+</button>
            <button onclick="removeFromCart(${index})">❌</button>
        `;
        cartItems.appendChild(li);
    });

    cartCount.innerText = totalItems;
    if (totalPriceEl) totalPriceEl.innerText = totalPrice;

    localStorage.setItem("cart", JSON.stringify(cart));
}

/* =====================
   ADD TO CART
===================== */
function addToCart(name, price) {
    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    updateCartUI();
}

/* =====================
   CHANGE QUANTITY
===================== */
function changeQty(index, delta) {
    cart[index].qty += delta;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    updateCartUI();
}

/* =====================
   REMOVE ITEM
===================== */
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

/* =====================
   CHECKOUT
===================== */
function goToCheckout() {
    if (cart.lengt
