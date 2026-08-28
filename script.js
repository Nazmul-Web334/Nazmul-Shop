// ===============================
// NAZMUL SHOP - JAVASCRIPT
// ===============================


// ===============================
// CART
// ===============================

let cart = JSON.parse(localStorage.getItem("nazmulCart")) || [];


// ===============================
// UPDATE CART COUNT
// ===============================

function updateCartCount() {

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

updateCartCount();


// ===============================
// ADD TO CART
// ===============================

const addToCartButtons =
    document.querySelectorAll(".add-to-cart");


addToCartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const productCard =
            button.closest(".product-card");

        if (!productCard) {
            return;
        }


        const productNameElement =
            productCard.querySelector("h3");

        const priceElement =
            productCard.querySelector(".price");


        const productName =
            productNameElement
                ? productNameElement.textContent.trim()
                : "Unknown Product";


        const priceText =
            priceElement
                ? priceElement.textContent
                : "৳0";


        const price =
            parseInt(
                priceText.replace(/[^\d]/g, "")
            ) || 0;


        const imageElement =
            productCard.querySelector("img");


        const image =
            imageElement
                ? imageElement.src
                : "";


        const product = {

            id: Date.now(),

            name: productName,

            price: price,

            image: image,

            quantity: 1

        };


        cart.push(product);


        localStorage.setItem(
            "nazmulCart",
            JSON.stringify(cart)
        );


        updateCartCount();


        alert(productName + " cart-এ যোগ হয়েছে!");

    });

});


// ===============================
// SEARCH
// ===============================

const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");


function searchProducts() {

    if (!searchInput) {
        return;
    }


    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const products =
        document.querySelectorAll(".product-card");


    let found = false;


    products.forEach(function(product) {

        const productText =
            product.textContent.toLowerCase();


        if (
            searchText === "" ||
            productText.includes(searchText)
        ) {

            product.style.display = "";

            found = true;

        } else {

            product.style.display = "none";

        }

    });


    if (
        searchText !== "" &&
        !found
    ) {

        alert("দুঃখিত, কোনো পণ্য পাওয়া যায়নি।");

    }

}


if (searchBtn) {

    searchBtn.addEventListener(
        "click",
        searchProducts
    );

}


if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                searchProducts();

            }

        }
    );

}


// ===============================
// NEWSLETTER
// ===============================

const newsletterForm =
    document.getElementById("newsletterForm");


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const emailInput =
                newsletterForm.querySelector(
                    'input[type="email"]'
                );


            if (
                emailInput &&
                emailInput.value.trim() !== ""
            ) {

                alert(
                    "ধন্যবাদ! Newsletter-এর জন্য আপনার email গ্রহণ করা হয়েছে।"
                );


                emailInput.value = "";

            }

        }
    );

}


// ===============================
// SHOP NOW BUTTON
// ===============================

const shopNowButton =
    document.querySelector(".shop-now-btn");


if (shopNowButton) {

    shopNowButton.addEventListener(
        "click",
        function() {

            const productsSection =
                document.getElementById("products");


            if (productsSection) {

                productsSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

}


// ===============================
// CATEGORY LINKS
// ===============================

const categoryLinks =
    document.querySelectorAll(
        ".category-card a"
    );


categoryLinks.forEach(function(link) {

    link.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            alert(
                "Category system আমরা পরের ধাপে তৈরি করব।"
            );

        }
    );

});


// ===============================
// CART LINK
// ===============================

const cartLink =
    document.querySelector(
        'a[href="cart.html"]'
    );


if (cartLink) {

    cartLink.addEventListener(
        "click",
        function() {

            localStorage.setItem(
                "nazmulCart",
                JSON.stringify(cart)
            );

        }
    );

}


// ===============================
// PAGE LOAD
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

        console.log(
            "Nazmul Shop JavaScript successfully loaded!"
        );

    }
);
// ==========================================
// OPEN PRODUCT DETAILS
// ==========================================

function openProduct(name, price, category, description) {

    const productData = {

        name: name,
        price: price,
        category: category,
        description: description

    };

    localStorage.setItem(
        "selectedProduct",
        JSON.stringify(productData)
    );

    window.location.href = "product.html";
}