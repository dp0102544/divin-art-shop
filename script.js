// ===== CART SETUP =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");

// ===== UPDATE CART UI =====
function updateCartUI() {
    cartCount.innerText = cart.length;
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<li>Your cart is empty 🛒</li>";
        localStorage.setItem("cart", JSON.stringify(cart));
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - ₹${item.price}
            <button onclick="removeFromCart(${index})">❌</button>
        `;
        cartItems.appendChild(li);
    });

    const totalLi = document.createElement("li");
    totalLi.style.fontWeight = "bold";
    totalLi.innerText = `Total: ₹${total}`;
    cartItems.appendChild(totalLi);

    localStorage.setItem("cart", JSON.stringify(cart));
}

// ===== ADD TO CART =====
function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
}

// ===== REMOVE FROM CART =====
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// ===== FILTER PRODUCTS =====
function filterCategory(category) {
    const products = document.querySelectorAll(".product");

    products.forEach(product => {
        if (category === "all" || product.dataset.category === category) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });

    document.querySelectorAll(".filters button").forEach(btn => {
        btn.classList.remove("active");
    });
}

// ===== SEARCH PRODUCTS =====
function searchProducts() {
    const input = document.getElementById("search").value.toLowerCase();
    document.querySelectorAll(".product").forEach(product => {
        const name = product.querySelector("h3").innerText.toLowerCase();
        product.style.display = name.includes(input) ? "block" : "none";
    });
}

// ===== LOAD CART ON PAGE LOAD =====
updateCartUI();
