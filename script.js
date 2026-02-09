let cartCount = 0;

function addToCart(productName) {
    cartCount++;

    // update cart count
    document.getElementById("cart-count").innerText = cartCount;

    // add item to cart list
    const li = document.createElement("li");
    li.innerText = productName;

    document.getElementById("cart-items").appendChild(li);
}
