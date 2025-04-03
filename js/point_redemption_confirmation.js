if (sessionStorage.getItem("pointsRedeemed") === "true") {
    // Redirect to another page if redemption is already completed
    window.location.href = "redeemed.html"; // Change to the appropriate page
}

console.log("Confirmation page script loaded");

// Function to mark points as redeemed
function redeemPoints() {
    if (sessionStorage.getItem("pointsRedeemed") === "true") {
        // Redirect to another page if redemption is already completed
        window.location.href = "redeemed.html"; // Change to the appropriate page
    }
    sessionStorage.setItem("pointsRedeemed", "true");
    window.location.href = "point_redemption.html"; // Redirect after redemption
}

// Redirect to Redemption Page on "Yes"
document.getElementById("yes-btn").addEventListener("click", () => {
    console.log("Yes button clicked");
    // Replace the current history entry with the Redemption Page
    history.replaceState(null, "", "point_redemption.html");
    redeemPoints();
});

// Redirect to Progress Page on "No, Go Back"
document.getElementById("no-btn").addEventListener("click", () => {
    console.log("No button clicked");
    window.location.href = "stampcard.html";
});
