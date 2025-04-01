if (sessionStorage.getItem("pointsRedeemed") === "true") {
    console.log("Redirecting to redeemed.html...");
    window.location.href = "redeemed.html"; // Ensure this page exists
} else if (sessionStorage.getItem("userLoggedIn") == "true") {
    console.log("Redirecting to stampcard.html...");
    window.location.href = "stampcard.html"; // Ensure this page exists
}
