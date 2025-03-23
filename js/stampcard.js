if (sessionStorage.getItem("pointsRedeemed") === "true") {
    // Redirect to another page if redemption is already completed
    window.location.href = "redeemed.html"; // Change to the appropriate page
}

// How many QR codes they need to scan to claim the prize
const TOTAL_CODES = 5;

// Function to get progress from localStorage
function getScannedCodes() {
    const saved = localStorage.getItem("scannedQRCodes");
    return saved ? JSON.parse(saved) : [];
}

// Function to save progress to localStorage
function saveScannedCodes(codes) {
    localStorage.setItem("scannedQRCodes", JSON.stringify(codes));
}

// Function to update the progress display on the page
function updateProgressDisplay(codes) {
    const progressDiv = document.getElementById("progress");
    const codesListDiv = document.getElementById("codesList");
    const prizeDiv = document.getElementById("prize");

    progressDiv.textContent = `You've scanned ${codes.length} out of ${TOTAL_CODES} codes.`;

    // Show scanned codes
    codesListDiv.innerHTML = "";
    codes.forEach((code, index) => {
        const p = document.createElement("p");
        p.textContent = `Scanned QR Code: ${code}`;
        codesListDiv.appendChild(p);
        const station = document.getElementById(code);
        station.classList.add("complete");
    });

    // Show claim prize button if they scanned all codes
    if (codes.length >= TOTAL_CODES) {
        prizeDiv.innerHTML = "";
        const claimButton = document.createElement("button");
        claimButton.textContent = "Claim Your Prize 🎉";
        claimButton.onclick = () => {
            window.location.replace("point_redemption_confirmation.html");
        };
        prizeDiv.appendChild(claimButton);
    } else {
        prizeDiv.innerHTML =
            "<p>Keep scanning QR codes to unlock the prize!</p>";
    }
}

// Main logic to check for query params and update progress
function main() {
    // Check if points have already been redeemed

    console.log("Hello");
    const scannedCodes = getScannedCodes();

    // Get the 'qrcode' parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);

    const qrCode = urlParams.get("qrcode");

    console.log(qrCode);

    if (qrCode && !scannedCodes.includes(qrCode)) {
        scannedCodes.push(qrCode);
        saveScannedCodes(scannedCodes);
    }

    updateProgressDisplay(scannedCodes);

    for (const e of document.getElementsByClassName("complete")) {
        if ("disabled" in e) {
            e.disabled = true; // Disable if the element supports the 'disabled' attribute
            e.ariaDisabled = true;
        } else {
            e.style.pointerEvents = "none"; // Prevent interactions for non-form elements
        }
    }
}

const urlParams = new URLSearchParams(window.location.search);

const goodieBag = urlParams.get("goodieBag");

if (goodieBag == "false") {
    alert(
        "Unfortunately, Goodie Bag Redemption is only available for Verified Users"
    );
}

document.addEventListener("DOMContentLoaded", () => {
    // Run the main function when the page loads
    main();
});
