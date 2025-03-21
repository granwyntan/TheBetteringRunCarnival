// Redirect to Home Page
document.getElementById("home-btn").addEventListener("click", () => {
    window.location.href = "index.html"; 
  });
  
  // Prevent going back to Confirmation or Progress Page
  history.replaceState(null, "", window.location.href);
  window.onpopstate = () => {
    history.go(1); 
  };
