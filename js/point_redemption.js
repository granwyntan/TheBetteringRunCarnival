if (sessionStorage.getItem("pointsRedeemed") === "true") {
    // Redirect to another page if redemption is already completed
    window.location.href = "redeemed.html"; // Change to the appropriate page
}

// Prevent going back to Confirmation or Progress Page
history.replaceState(null, "", window.location.href);
window.onpopstate = () => {
    history.go(1);
};
