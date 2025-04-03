if (sessionStorage.getItem("pointsRedeemed") === "true") {
    // Redirect to another page if redemption is already completed
    window.location.href = "redeemed.html"; // Change to the appropriate page
}

// How many QR codes they need to scan to claim the prize
const TOTAL_CODES = 5;

let codes = [
    "c6d9bdfc493eb3948e5ac2e51c3c65f6db3c26a0d702d42e255b6a79fe4ed07d", // Hash of 'one'
    "6e7552e8fe51972c90ef7c6f2d423249836937a1be4980f7359f8d5c8d735a7a", // Hash of 'two'
    "825c14326484a1e1eb1eeb5911ed8329e69db45b22d885c6b19c1f169a7bb348", // Hash of 'three'
    "f6932b1c88c815ac503ecb6bbd31f95fdbf4fe3f307039c45a3b5943f5d153f9", // Hash of 'four'
    "7d71d1c45b89a253c6eb23b67855e912a402b56d59c5b7cda8b98ed1e1f6a540", // Hash of 'five'
];

let station_names = [
    "Sustainability Meets Fashion",
    "Cap & Create",
    "HealthIQ",
    "Bin It Right!",
    "Stress Less, Waste Less",
];

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

    progressDiv.textContent = `You have completed ${codes.length} station(s) out of ${TOTAL_CODES} stations:`;

    // Show scanned codes
    codesListDiv.innerHTML = "";
    codes.forEach((code, index) => {
        const p = document.createElement("p");
        p.innerHTML = `<b>${station_names[code - 1]}</b>`;
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
            "<p>Complete all 5 stations to win a LUCKY DRAW TICKET or special prize — redeemable at the redemption counter!</p>";
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

    console.log(scannedCodes);

    if (
        codes.includes(qrCode) &&
        !scannedCodes.includes(codes.indexOf(qrCode) + 1) &&
        scannedCodes.length < TOTAL_CODES
    ) {
        scannedCodes.push(codes.indexOf(qrCode) + 1);
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

const foodVoucher = urlParams.get("foodVoucher");

if (foodVoucher == "false") {
    alert(
        "Unfortunately, Food Voucher Redemption is only available for Verified Users"
    );
}

const photoBooth = urlParams.get("photoBooth");

if (photoBooth == "false") {
    alert(
        "Unfortunately, Photo Booth Voucher Redemption is only available for Verified Users"
    );
}

document.addEventListener("DOMContentLoaded", () => {
    // Run the main function when the page loads
    main();
});
