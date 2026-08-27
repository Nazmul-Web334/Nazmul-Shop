// ===============================
// NAZMUL SHOP - CART SYSTEM
// ===============================


// Cart থেকে LocalStorage-এর data নেওয়া
let cart = JSON.parse(localStorage.getItem("nazmulCart")) || [];


// ===============================
// CART COUNT
// ===============================

function updateCartCount() {

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}


// ===============================
// CART DISPLAY
// ===============================

function displayCart() {

    const cartItems =
        document.getElementById("cartItems");

    const emptyCart =
        document.getElementById("emptyCart");


    if (!cartItems || !emptyCart) {
        return;
    }


    // Cart খালি হলে
    if (cart.length === 0) {

        cartItems.innerHTML = "";

        emptyCart.style.display = "block";

        updateTotal();

        return;
    }


    // Cart-এ পণ্য থাকলে
    emptyCart.style.display = "none";


    cartItems.innerHTML = "";


    cart.forEach(function(product, index) {

        const item = document.createElement("div");

        item.className = "cart-item";


        item.innerHTML = `

            <div class="cart-product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="cart-product-info">

                <h3>
                    ${product.name}
                </h3>

                <p class="cart-product-price">
                    ৳${product.price}
                </p>


                <div class="quantity-box">

                    <button
                        onclick="decreaseQuantity(${index})">

                        −

                    </button>


                    <span>
                        ${product.quantity}
                    </span>


                    <button
                        onclick="increaseQuantity(${index})">

                        +

                    </button>

                </div>


                <button
                    class="remove-btn"
                    onclick="removeFromCart(${index})">

                    🗑 Remove

                </button>

            </div>

        `;


        cartItems.appendChild(item);

    });


    updateTotal();

}


// ===============================
// INCREASE QUANTITY
// ===============================

function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();

}


// ===============================
// DECREASE QUANTITY
// ===============================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    saveCart();

}


// ===============================
// REMOVE PRODUCT
// ===============================

function removeFromCart(index) {

    const productName =
        cart[index].name;


    const confirmRemove =
        confirm(
            productName +
            " Cart থেকে Remove করবেন?"
        );


    if (confirmRemove) {

        cart.splice(index, 1);

        saveCart();

    }

}


// ===============================
// SAVE CART
// ===============================

function saveCart() {

    localStorage.setItem(
        "nazmulCart",
        JSON.stringify(cart)
    );


    displayCart();

    updateCartCount();

}


// ===============================
// TOTAL CALCULATION
// ===============================

function updateTotal() {

    const subtotalElement =
        document.getElementById("subtotal");

    const deliveryElement =
        document.getElementById("delivery");

    const totalElement =
        document.getElementById("cartTotal");


    let subtotal = 0;


    cart.forEach(function(product) {

        subtotal +=
            product.price *
            product.quantity;

    });


    // Delivery charge
    let delivery = 0;


    if (subtotal > 0) {

        delivery = 60;

    }


    const total =
        subtotal + delivery;


    if (subtotalElement) {

        subtotalElement.textContent =
            "৳" + subtotal;

    }


    if (deliveryElement) {

        deliveryElement.textContent =
            "৳" + delivery;

    }


    if (totalElement) {

        totalElement.textContent =
            "৳" + total;

    }

}


// ===============================
// CHECKOUT BUTTON
// ===============================

const checkoutBtn =
    document.getElementById("checkoutBtn");


if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        function() {

            if (cart.length === 0) {

                alert(
                    "আপনার Cart খালি। আগে কিছু পণ্য Add করুন।"
                );

                return;

            }

            window.location.href =
                "checkout.html";

        }
    );

}




// ===============================
// PAGE LOAD
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayCart();

        updateCartCount();

    }
);