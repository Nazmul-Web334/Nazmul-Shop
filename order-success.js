// ==========================================
// NAZMUL SHOP - ORDER SUCCESS
// ==========================================

// Saved orders
const orders =
    JSON.parse(
        localStorage.getItem("nazmulOrders")
    ) || [];


// HTML elements
const successOrderId =
    document.getElementById("successOrderId");

const successCustomerName =
    document.getElementById("successCustomerName");

const successMobile =
    document.getElementById("successMobile");

const successTotal =
    document.getElementById("successTotal");

const successStatus =
    document.getElementById("successStatus");

const cartCount =
    document.getElementById("cartCount");


// ==========================================
// SHOW CART COUNT
// ==========================================

if (cartCount) {

    cartCount.textContent = "0";

}


// ==========================================
// GET LAST ORDER
// ==========================================

if (orders.length > 0) {

    const lastOrder =
        orders[orders.length - 1];


    // Order ID
    if (successOrderId) {

        successOrderId.textContent =
            lastOrder.orderId;

    }


    // Customer Name
    if (successCustomerName) {

        successCustomerName.textContent =
            lastOrder.customerName;

    }


    // Mobile
    if (successMobile) {

        successMobile.textContent =
            lastOrder.mobile;

    }


    // Total
    if (successTotal) {

        successTotal.textContent =
            "৳" + lastOrder.total;

    }


    // Status
    if (successStatus) {

        successStatus.textContent =
            lastOrder.status;

    }

}