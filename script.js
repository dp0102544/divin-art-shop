document.addEventListener("DOMContentLoaded", () => {

    /* ===== CART SETUP ===== */
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");

    /* ===== UPDATE CART UI ===== */
    function updateCartUI() {
        cartCount.innerText = cart.length;
        cartItems.innerHTML = "";

        if (cart.length === 0) {
            cartItems.innerHTML = "<li>Your cart is empty 🛒</li>";
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

    /* ===== ADD TO CART ===== */
    window.addToCart = function(name, price) {
        cart.push({ name, price });
        updateCartUI();
    };

    /* ===== REMOVE FROM CART ===== */
    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        updateCartUI();
    };

    /* ===== FILTER CATEGORY ===== */
    window.filterCategory = function(category) {
        document.querySelectorAll(".product").forEach(product => {
            product.style.display =
                category === "all" || product.dataset.category === category
                ? ""
                : "none";
        });

        document.querySelectorAll(".filters button").forEach(btn => {
            btn.classList.remove("active");
        });

        event.target.classList.add("active");
    };

    /* ===== SEARCH ===== */
    window.searchProducts = function() {
        const value = document.getElementById("search").value.toLowerCase();

        document.querySelectorAll(".product").forEach(product => {
            const name = product.querySelector("h3").innerText.toLowerCase();
            product.style.display = name.includes(value) ? "" : "none";
        });
    };

    updateCartUI();
});
