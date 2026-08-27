// ==========================================
// NAZMUL SHOP - REAL DEMO LOGIN
// ==========================================


// Login Form
const loginForm =
    document.getElementById("loginForm");


// Input
const loginMobile =
    document.getElementById("loginMobile");

const loginPassword =
    document.getElementById("loginPassword");


// Show Password
const showPassword =
    document.getElementById("showPassword");


// ==========================================
// SHOW / HIDE PASSWORD
// ==========================================

if (showPassword) {

    showPassword.addEventListener(
        "click",
        function() {

            if (loginPassword.type === "password") {

                loginPassword.type = "text";

                showPassword.textContent = "🙈";

            } else {

                loginPassword.type = "password";

                showPassword.textContent = "👁️";

            }

        }
    );

}


// ==========================================
// MOBILE NUMBER
// ==========================================

if (loginMobile) {

    loginMobile.addEventListener(
        "input",
        function() {

            loginMobile.value =
                loginMobile.value.replace(
                    /[^0-9]/g,
                    ""
                );

        }
    );

}


// ==========================================
// LOGIN
// ==========================================

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const mobile =
                loginMobile.value.trim();

            const password =
                loginPassword.value;


            // Mobile validation
            if (
                mobile.length !== 11 ||
                !mobile.startsWith("01")
            ) {

                alert(
                    "সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন।"
                );

                loginMobile.focus();

                return;

            }


            // Password validation
            if (password.length < 6) {

                alert(
                    "Password কমপক্ষে ৬ অক্ষরের হতে হবে।"
                );

                loginPassword.focus();

                return;

            }


            // =================================
            // GET REGISTERED USERS
            // =================================

            const users =
                JSON.parse(
                    localStorage.getItem(
                        "nazmulUsers"
                    )
                ) || [];


            // =================================
            // FIND USER
            // =================================

            const user =
                users.find(
                    function(item) {

                        return (
                            item.mobile === mobile &&
                            item.password === password
                        );

                    }
                );


            // =================================
            // LOGIN FAILED
            // =================================

            if (!user) {

                alert(
                    "মোবাইল নম্বর অথবা Password ভুল।"
                );

                return;

            }


            // =================================
            // LOGIN SUCCESS
            // =================================

            localStorage.setItem(
                "nazmulLoggedIn",
                "true"
            );


            localStorage.setItem(
                "nazmulUserName",
                user.name
            );


            localStorage.setItem(
                "nazmulUserMobile",
                user.mobile
            );


            alert(
                "স্বাগতম " +
                user.name +
                "! 🎉"
            );


            // Home Page
            window.location.href =
                "index.html";

        }
    );

}