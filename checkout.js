// ==========================================
// NAZMUL SHOP - CHECKOUT SYSTEM
// ==========================================


// Cart থেকে পণ্য নেওয়া
let cart =
    JSON.parse(
        localStorage.getItem("nazmulCart")
    ) || [];


// HTML Elements
const checkoutItems =
    document.getElementById("checkoutItems");

const checkoutSubtotal =
    document.getElementById("checkoutSubtotal");

const checkoutDelivery =
    document.getElementById("checkoutDelivery");

const checkoutTotal =
    document.getElementById("checkoutTotal");

const checkoutForm =
    document.getElementById("checkoutForm");

const customerMobile =
    document.getElementById("customerMobile");

const cartCount =
    document.getElementById("cartCount");


// ==========================================
// CART COUNT
// ==========================================

if (cartCount) {

    cartCount.textContent = cart.length;

}


// ==========================================
// DISPLAY CHECKOUT ITEMS
// ==========================================

function displayCheckoutItems() {

    if (!checkoutItems) {
        return;
    }


    // Cart খালি হলে
    if (cart.length === 0) {

        checkoutItems.innerHTML = `

            <div class="empty-checkout">

                <p>
                    আপনার Cart খালি।
                </p>

                <a href="index.html">
                    Shopping শুরু করুন
                </a>

            </div>

        `;

        updateCheckoutTotal();

        return;
    }


    checkoutItems.innerHTML = "";


    cart.forEach(function(product) {

        const item =
            document.createElement("div");

        item.className =
            "checkout-item";


        item.innerHTML = `

            <div class="checkout-item-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="checkout-item-info">

                <h4>
                    ${product.name}
                </h4>

                <p>
                    ৳${product.price}
                    ×
                    ${product.quantity}
                </p>

            </div>

        `;


        checkoutItems.appendChild(item);

    });


    updateCheckoutTotal();

}


// ==========================================
// TOTAL CALCULATION
// ==========================================

function updateCheckoutTotal() {

    let subtotal = 0;


    cart.forEach(function(product) {

        subtotal +=
            Number(product.price) *
            Number(product.quantity);

    });


    // Delivery Charge
    let delivery = 0;


    if (subtotal > 0) {

        delivery = 60;

    }


    const total =
        subtotal + delivery;


    if (checkoutSubtotal) {

        checkoutSubtotal.textContent =
            "৳" + subtotal;

    }


    if (checkoutDelivery) {

        checkoutDelivery.textContent =
            "৳" + delivery;

    }


    if (checkoutTotal) {

        checkoutTotal.textContent =
            "৳" + total;

    }

}


// ==========================================
// MOBILE NUMBER
// ==========================================

if (customerMobile) {

    customerMobile.addEventListener(
        "input",
        function() {

            customerMobile.value =
                customerMobile.value.replace(
                    /[^0-9]/g,
                    ""
                );

        }
    );

}


// ==========================================
// PLACE ORDER
// ==========================================

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            // Cart empty check
            if (cart.length === 0) {

                alert(
                    "আপনার Cart খালি।"
                );

                return;

            }


            const customerName =
                document.getElementById(
                    "customerName"
                ).value.trim();


            const mobile =
                customerMobile.value.trim();


            const address =
                document.getElementById(
                    "customerAddress"
                ).value.trim();


            const district =
                document.getElementById(
                    "customerDistrict"
                ).value;


            // Mobile validation
            if (
                mobile.length !== 11 ||
                !mobile.startsWith("01")
            ) {

                alert(
                    "সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন।"
                );

                customerMobile.focus();

                return;

            }


            // Name check
            if (customerName.length < 2) {

                alert(
                    "দয়া করে আপনার নাম লিখুন।"
                );

                return;

            }


            // Address check
            if (address.length < 5) {

                alert(
                    "দয়া করে সম্পূর্ণ ঠিকানা লিখুন।"
                );

                return;

            }


            // District check
            if (!district) {

                alert(
                    "দয়া করে জেলা নির্বাচন করুন।"
                );

                return;

            }


            // Delivery method
            const deliveryMethod =
                document.querySelector(
                    'input[name="deliveryMethod"]:checked'
                ).value;


            // Payment method
            const paymentMethod =
                document.querySelector(
                    'input[name="paymentMethod"]:checked'
                ).value;


            // =================================
            // CALCULATE TOTAL
            // =================================

            let subtotal = 0;


            cart.forEach(function(product) {

                subtotal +=
                    Number(product.price) *
                    Number(product.quantity);

            });


            const delivery = 60;

            const total =
                subtotal + delivery;


            // =================================
            // CREATE ORDER
            // =================================

            const order = {

                orderId:
                    "NZ" +
                    Date.now(),

                customerName:
                    customerName,

                mobile:
                    mobile,

                address:
                    address,

                district:
                    district,

                deliveryMethod:
                    deliveryMethod,

                paymentMethod:
                    paymentMethod,

                products:
                    cart,

                subtotal:
                    subtotal,

                delivery:
                    delivery,

                total:
                    total,

                orderDate:
                    new Date().toLocaleString(),

                status:
                    "Pending"

            };


            // =================================
            // SAVE ORDER
            // =================================

            let orders =
                JSON.parse(
                    localStorage.getItem(
                        "nazmulOrders"
                    )
                ) || [];


            orders.push(order);


            localStorage.setItem(
                "nazmulOrders",
                JSON.stringify(orders)
            );


            // =================================
            // CLEAR CART
            // =================================

            localStorage.removeItem(
                "nazmulCart"
            );


            // =================================
            // SUCCESS
            // =================================

            alert(
                "অর্ডার সফলভাবে গ্রহণ করা হয়েছে! 🎉\n\n" +
                "Order ID: " +
                order.orderId
            );


            // Order Success Page
            window.location.href =
                "order-success.html";

        }
    );

}


// ==========================================
// PAGE LOAD
// ==========================================

displayCheckoutItems();