// ==========================================
// NAZMUL SHOP - MY ACCOUNT
// ==========================================


// Logged in status
const isLoggedIn =
    localStorage.getItem("nazmulLoggedIn");


// User information
const userName =
    localStorage.getItem("nazmulUserName");

const userMobile =
    localStorage.getItem("nazmulUserMobile");


// HTML Elements
const accountName =
    document.getElementById("accountName");

const accountMobile =
    document.getElementById("accountMobile");

const ordersList =
    document.getElementById("ordersList");

const logoutBtn =
    document.getElementById("logoutBtn");


// ==========================================
// CHECK LOGIN
// ==========================================

if (isLoggedIn !== "true") {

    alert(
        "My Account দেখতে আগে Login করুন।"
    );

    window.location.href =
        "login.html";

}


// ==========================================
// SHOW USER INFORMATION
// ==========================================

if (accountName && userName) {

    accountName.textContent =
        userName;

}


if (accountMobile && userMobile) {

    accountMobile.textContent =
        userMobile;

}


// ==========================================
// SHOW ORDERS
// ==========================================

const allOrders =
    JSON.parse(
        localStorage.getItem("nazmulOrders")
    ) || [];


if (ordersList) {


    // Login করা User-এর Order
    const userOrders =
        allOrders.filter(
            function(order) {

                return (
                    order.mobile ===
                    userMobile
                );

            }
        );


    // কোনো Order না থাকলে
    if (userOrders.length === 0) {

        ordersList.innerHTML = `

            <p class="no-orders">

                এখনো কোনো Order নেই।

            </p>

        `;

    } else {


        ordersList.innerHTML = "";


        // সর্বশেষ Order আগে দেখাবে
        userOrders.reverse();


        userOrders.forEach(
            function(order) {


                const orderCard =
                    document.createElement("div");


                orderCard.className =
                    "order-card";


                orderCard.innerHTML = `

                    <div class="order-card-header">

                        <span class="order-id">

                            Order ID:
                            ${order.orderId}

                        </span>


                        <span class="order-status">

                            ${order.status}

                        </span>

                    </div>


                    <div class="order-card-row">

                        <span>
                            Date
                        </span>

                        <span>
                            ${order.orderDate}
                        </span>

                    </div>


                    <div class="order-card-row">

                        <span>
                            District
                        </span>

                        <span>
                            ${order.district}
                        </span>

                    </div>


                    <div class="order-card-row">

                        <span>
                            Payment
                        </span>

                        <span>

                            ${
                                order.paymentMethod ===
                                "cod"
                                ? "Cash on Delivery"
                                : "Mobile Payment"
                            }

                        </span>

                    </div>


                    <div class="order-card-row">

                        <span>
                            Total
                        </span>

                        <strong class="order-total">

                            ৳${order.total}

                        </strong>

                    </div>

                `;


                ordersList.appendChild(
                    orderCard
                );

            }
        );

    }

}


// ==========================================
// LOGOUT
// ==========================================

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function() {


            const confirmLogout =
                confirm(
                    "আপনি কি Logout করতে চান?"
                );


            if (!confirmLogout) {

                return;

            }


            // Login information remove
            localStorage.removeItem(
                "nazmulLoggedIn"
            );

            localStorage.removeItem(
                "nazmulUserName"
            );

            localStorage.removeItem(
                "nazmulUserMobile"
            );


            alert(
                "আপনি সফলভাবে Logout করেছেন।"
            );


            window.location.href =
                "index.html";

        }
    );

}