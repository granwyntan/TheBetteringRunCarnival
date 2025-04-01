async function fetchVerifiedNumbers() {
    const response = await fetch(
        "https://shy-unit-e261.gran5g2017.workers.dev/"
    );
    const data = await response.json();
    console.log(data.values.flat());
    return data.values.flat(); // Converts to a simple array of phone numbers
}

function validatePhoneNumber() {
    const input = document.getElementById("username");
    const phoneNumber = input.value;

    // Check if the phone number is within the valid ranges
    if (
        (phoneNumber >= 600000000 && phoneNumber <= 699999999) ||
        (phoneNumber >= 800000000 && phoneNumber <= 999999999)
    ) {
        input.setCustomValidity(""); // Valid number
    } else {
        input.setCustomValidity("Please enter a valid phone number.");
    }
}

// Function for handling normal login
async function handleLogin() {
    console.log("User clicked Login");

    const inputNumber = document.getElementById("username").value.trim();
    const allowedNumbers = await fetchVerifiedNumbers();

    if (allowedNumbers.includes(inputNumber)) {
        sessionStorage.setItem("userLoggedIn", "true");
        sessionStorage.setItem("guestUser", "false");
        console.log("userLoggedIn set to true");

        // Redirect after setting session
        window.location.href = "stampcard.html";
    } else {
        alert("Invalid Registration ID.");
    }
}

// Function for handling guest login
function handleGuestLogin() {
    console.log("User logged in as Guest");

    sessionStorage.setItem("guestUser", "true");
    sessionStorage.setItem("userLoggedIn", "true");
    console.log("guestUser set to true");

    // Redirect to guest-access page
    window.location.href = "stampcard.html";
}

if (sessionStorage.getItem("pointsRedeemed") === "true") {
    console.log("Redirecting to redeemed.html...");
    window.location.href = "redeemed.html"; // Ensure this page exists
} else if (sessionStorage.getItem("userLoggedIn") == "true") {
    console.log("Redirecting to stampcard.html...");
    window.location.href = "stampcard.html"; // Ensure this page exists
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Loaded");

    // Handle loading animation
    setTimeout(() => {
        const overlay = document.querySelector(".loading-overlay");
        if (overlay) {
            overlay.style.opacity = 0;
            overlay.style.pointerEvents = "none";
        }
    }, 1500);

    // Button event listeners
    const loginButton = document.querySelector(".primary-button");
    const guestLoginButton = document.querySelector(".secondary-button");

    if (loginButton) {
        loginButton.addEventListener("click", handleLogin);
    } else {
        console.log("Login button not found");
    }

    if (guestLoginButton) {
        guestLoginButton.addEventListener("click", handleGuestLogin);
    } else {
        console.log("Guest Login button not found");
    }
});
