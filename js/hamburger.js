const button = document.getElementById("hamburger-button");
const hamburger = document.getElementById("hamburger");

button.addEventListener("click", () => {
    button.classList.toggle("active");
    hamburger.classList.toggle("active");
});
