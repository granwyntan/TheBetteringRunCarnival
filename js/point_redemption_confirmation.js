console.log("Confirmation page script loaded");

// Redirect to Redemption Page on "Yes"
document.getElementById("yes-btn").addEventListener("click", () => {
  console.log("Yes button clicked"); 
  // Replace the current history entry with the Redemption Page
  history.replaceState(null, "", "point_redemption.html");
  window.location.href = "point_redemption.html";
});

// Redirect to Progress Page on "No, Go Back"
document.getElementById("no-btn").addEventListener("click", () => {
  console.log("No button clicked"); 
  window.location.href = "index.html"; 
});