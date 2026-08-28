// ==========================================
// NAZMUL SHOP - REGISTRATION SYSTEM
// ==========================================


// Registration Form
const registerForm =
    document.getElementById("registerForm");


// Input Elements
const registerName =
    document.getElementById("registerName");

const registerMobile =
    document.getElementById("registerMobile");

const registerPassword =
    document.getElementById("registerPassword");

const confirmPassword =
    document.getElementById("confirmPassword");

const agreeTerms =
    document.getElementById("agreeTerms");


// ==========================================
// MOBILE NUMBER - ONLY NUMBERS
// ==========================================

if (registerMobile) {

    registerMobile.addEventListener(
        "input",
        function() {

            registerMobile.value =
                registerMobile.value.replace(
                    /[^0-9]/g,
                    ""
                );

        }
    );

}


// ==========================================
// SHOW / HIDE PASSWORD
// ==========================================

const showRegisterPassword =
    document.getElementById(
        "showRegisterPassword"
    );


if (showRegisterPassword) {

    showRegisterPassword.addEventListener(
        "click",
        function() {

            if (
                registerPassword.type ===
                "password"
            ) {

                registerPassword.type = "text";

                showRegisterPassword.textContent =
                    "🙈";

            } else {

                registerPassword.type =
                    "password";

                showRegisterPassword.textContent =
                    "👁️";

            }

        }
    );

}


// ==========================================
// SHOW / HIDE CONFIRM PASSWORD
// ==========================================

const showConfirmPassword =
    document.getElementById(
        "showConfirmPassword"
    );


if (showConfirmPassword) {

    showConfirmPassword.addEventListener(
        "click",
        function() {

            if (
                confirmPassword.type ===
                "password"
            ) {

                confirmPassword.type =
                    "text";

                showConfirmPassword.textContent =
                    "🙈";

            } else {

                confirmPassword.type =
                    "password";

                showConfirmPassword.textContent =
                    "👁️";

            }

        }
    );

}


// ==========================================
// REGISTRATION
// ==========================================

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            // Get values
            const name =
                registerName.value.trim();

            const mobile =
                registerMobile.value.trim();

            const password =
                registerPassword.value;

            const confirm =
                confirmPassword.value;


            // =================================
            // NAME CHECK
            // =================================

            if (name.length < 2) {

                alert(
                    "দয়া করে আপনার সঠিক নাম লিখুন।"
                );

                registerName.focus();

                return;

            }


            // =================================
            // MOBILE CHECK
            // =================================

            if (
                mobile.length !== 11 ||
                !mobile.startsWith("01")
            ) {

                alert(
                    "সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন।"
                );

                registerMobile.focus();

                return;

            }


            // =================================
            // PASSWORD CHECK
            // =================================

            if (password.length < 6) {

                alert(
                    "Password কমপক্ষে ৬ অক্ষরের হতে হবে।"
                );

                registerPassword.focus();

                return;

            }


            // =================================
            // PASSWORD MATCH
            // =================================

            if (password !== confirm) {

                alert(
                    "দুটি Password একই নয়।"
                );

                confirmPassword.focus();

                return;

            }


            // =================================
            // TERMS CHECK
            // =================================

            if (!agreeTerms.checked) {

                alert(
                    "Account তৈরি করতে Terms মেনে নিন।"
                );

                return;

            }


            // =================================
            // EXISTING USERS
            // =================================

            let users =
                JSON.parse(
                    localStorage.getItem(
                        "nazmulUsers"
                    )
                ) || [];


            // Check duplicate mobile
            const existingUser =
                users.find(
                    function(user) {

                        return user.mobile === mobile;

                    }
                );


            if (existingUser) {

                alert(
                    "এই মোবাইল নম্বর দিয়ে ইতিমধ্যে Account আছে।"
                );

                return;

            }


            // =================================
            // CREATE USER
            // =================================

            const newUser = {

                id: Date.now(),

                name: name,

                mobile: mobile,

                password: password

            };


            users.push(newUser);


            // Save users
            localStorage.setItem(
                "nazmulUsers",
                JSON.stringify(users)
            );


            // =================================
            // SUCCESS
            // =================================

            alert(
                "Account সফলভাবে তৈরি হয়েছে! 🎉"
            );


            // Login Page
            window.location.href =
                "login.html";

        }
    );

}