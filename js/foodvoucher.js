document.addEventListener("DOMContentLoaded", function () {
    if (sessionStorage.getItem("guestUser") === "true") {
        window.location.href = "stampcard.html?foodVoucher=false"; // Redirect for guest users
    }

    const openPopupBtn = document.getElementById("redeemButton");
    const popup = document.getElementById("popup");
    const cancelBtn = document.getElementById("cancel");
    const confirmBtn = document.getElementById("confirm");

    function redeemed() {
        const redeemedImg = document.getElementById("redeemedimg");
        redeemedImg.style.display = "block";
        const box = document.getElementById("box");
        box.style.backgroundColor = "#A83333"; // Indicate redemption
        const button = document.getElementById("redeemButton");
        button.textContent = "Redeemed";
        button.disabled = true;
        button.classList.add("disabled");
        document.getElementById("bottomDisclaimer").textContent =
            "Enjoy your treat! You have successfully redeemed your food voucher from The Bettering Run 2025.";
        document.getElementById("bottomDisclaimer").style.height = "auto";
    }

    if (localStorage.getItem("redeemed_food") === "true") {
        redeemed();
    }

    // Open the popup
    openPopupBtn.addEventListener("click", function () {
        if (localStorage.getItem("redeemed_food") === "true") {
            popup.style.display = "none";
        } else {
            popup.style.display = "flex";
        }
    });

    // Close the popup
    cancelBtn.addEventListener("click", function () {
        popup.style.display = "none";
    });

    confirmBtn.addEventListener("click", function () {
        localStorage.setItem("redeemed_food", "true");
        popup.style.display = "none";
        redeemed();
    });

    // Close popup when clicking outside
    window.addEventListener("click", function (event) {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
});
