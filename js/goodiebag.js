document.addEventListener("DOMContentLoaded", function () {
    if (sessionStorage.getItem("guestUser") === "true") {
        window.location.href = "stampcard.html?goodieBag=false"; // Change to the appropriate page
    }

    const openPopupBtn = document.getElementById("redeemButton");
    const popup = document.getElementById("popup");
    const cancelBtn = document.getElementById("cancel");
    const confirmBtn = document.getElementById("confirm");

    function redeemed() {
        const redeemedImg = document.getElementById("redeemedimg");
        redeemedImg.style.display = "flex";
        const box = document.getElementById("box");
        box.style.backgroundColor = "#A83333";
        const button = document.getElementById("redeemButton");
        button.textContent = "Redeemed";
        button.disabled = true;
        button.classList.add("disabled");
        document.getElementById("bottomDisclaimer").textContent =
            "Thank you for coming to the Bettering Run 2025!";
        document.getElementById("bottomDisclaimer").style.height = "auto";
    }

    if (localStorage.getItem("redeemed") === "true") {
        redeemed();
    }

    // Open the popup
    openPopupBtn.addEventListener("click", function () {
        if (localStorage.getItem("redeemed") === "true") {
            popup.style.display = "none";
        } else {
            popup.style.display = "flex";
        }
    });

    // Close the popup when clicking the close button
    cancelBtn.addEventListener("click", function () {
        popup.style.display = "none";
    });

    confirmBtn.addEventListener("click", function () {
        localStorage.setItem("redeemed", "true");
        popup.style.display = "none";
        redeemed();
    });

    // Close the popup when clicking outside the content
    window.addEventListener("click", function (event) {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
});
