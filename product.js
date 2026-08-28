// ==========================================
// NAZMUL SHOP - PRODUCT DETAILS
// ==========================================


// Product information
const defaultProduct = {

    name: "Premium Perfume",

    category: "Perfume",

    price: 850,

    image: "https://via.placeholder.com/600x600",

    rating: "⭐⭐⭐⭐⭐",

    reviews: 25,

    description:
        "এই Premium Perfume একটি সুন্দর ও দীর্ঘস্থায়ী fragrance। দৈনন্দিন ব্যবহার এবং বিশেষ অনুষ্ঠানের জন্য উপযোগী।"

};


const savedProduct =
    JSON.parse(
        localStorage.getItem("selectedProduct")
    );


const product = savedProduct || defaultProduct;


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const productImage =
    document.getElementById("productImage");

const productName =
    document.getElementById("productName");

const productCategory =
    document.getElementById("productCategory");

const productPrice =
    document.getElementById("productPrice");

const productDescription =
    document.getElementById("productDescription");

const productRating =
    document.getElementById("productRating");

const quantityElement =
    document.getElementById("quantity");

const minusBtn =
    document.getElementById("minusBtn");

const plusBtn =
    document.getElementById("plusBtn");

const addToCartBtn =
    document.getElementById("detailsAddToCart");

const buyNowBtn =
    document.getElementById("buyNowBtn");


// ==========================================
// SHOW PRODUCT
// ==========================================

if (productImage) {

    productImage.src = product.image;

    productImage.alt = product.name;

}


if (productName) {

    productName.textContent =
        product.name;

}


if (productCategory) {

    productCategory.textContent =
        product.category;

}


if (productPrice) {

    productPrice.textContent =
        "৳" + product.price;

}


if (productDescription) {

    productDescription.textContent =
        product.description;

}


if (productRating) {

    productRating.innerHTML =
        product.rating +
        " <span>(" +
        product.reviews +
        " Reviews)</span>";

}


// ==========================================
// QUANTITY
// ==========================================

let quantity = 1;


// PLUS BUTTON
if (plusBtn) {

    plusBtn.addEventListener(
        "click",
        function() {

            quantity++;

            quantityElement.textContent =
                quantity;

        }
    );

}


// MINUS BUTTON
if (minusBtn) {

    minusBtn.addEventListener(
        "click",
        function() {

            if (quantity > 1) {

                quantity--;

                quantityElement.textContent =
                    quantity;

            }

        }
    );

}


// ==========================================
// ADD TO CART
// ==========================================

if (addToCartBtn) {

    addToCartBtn.addEventListener(
        "click",
        function() {


            // Existing cart নেওয়া
            let cart =
                JSON.parse(
                    localStorage.getItem(
                        "nazmulCart"
                    )
                ) || [];


            // Product তৈরি
            const cartProduct = {

                id: Date.now(),

                name: product.name,

                price: product.price,

                image: product.image,

                quantity: quantity

            };


            // Cart-এ যোগ
            cart.push(cartProduct);


            // LocalStorage-এ Save
            localStorage.setItem(
                "nazmulCart",
                JSON.stringify(cart)
            );


            // Cart count update
            updateCartCount();


            alert(
                product.name +
                " Cart-এ যোগ হয়েছে!"
            );

        }
    );

}


// ==========================================
// CART COUNT
// ==========================================

function updateCartCount() {

    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (!cartCount) {
        return;
    }


    const cart =
        JSON.parse(
            localStorage.getItem(
                "nazmulCart"
            )
        ) || [];


    cartCount.textContent =
        cart.length;

}


updateCartCount();


// ==========================================
// BUY NOW
// ==========================================

if (buyNowBtn) {

    buyNowBtn.addEventListener(
        "click",
        function() {


            // Cart-এ product যোগ
            let cart =
                JSON.parse(
                    localStorage.getItem(
                        "nazmulCart"
                    )
                ) || [];


            const cartProduct = {

                id: Date.now(),

                name: product.name,

                price: product.price,

                image: product.image,

                quantity: quantity

            };


            cart.push(cartProduct);


            localStorage.setItem(
                "nazmulCart",
                JSON.stringify(cart)
            );


            // সরাসরি Cart Page
            window.location.href =
                "cart.html";

        }
    );

}