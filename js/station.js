if (sessionStorage.getItem("pointsRedeemed") === "true") {
    // Redirect to another page if redemption is already completed
    window.location.href = "redeemed.html"; // Change to the appropriate page
}

let codes = [
    "c6d9bdfc493eb3948e5ac2e51c3c65f6db3c26a0d702d42e255b6a79fe4ed07d", // Hash of 'one'
    "6e7552e8fe51972c90ef7c6f2d423249836937a1be4980f7359f8d5c8d735a7a", // Hash of 'two'
    "825c14326484a1e1eb1eeb5911ed8329e69db45b22d885c6b19c1f169a7bb348", // Hash of 'three'
    "f6932b1c88c815ac503ecb6bbd31f95fdbf4fe3f307039c45a3b5943f5d153f9", // Hash of 'four'
    "7d71d1c45b89a253c6eb23b67855e912a402b56d59c5b7cda8b98ed1e1f6a540", // Hash of 'five'
];

function onScanSuccess(decodedText, decodedResult) {
    if (
        decodedText.includes(
            "thebetteringbranchandbytepenguinarethegoatsweareup"
        )
    ) {
        let params = new URLSearchParams(window.location.search);
        let receivedStation = decodedText.substring(
            decodedText.length - 2,
            decodedText.length - 1
        );
        if (receivedStation == params.get("station")) {
            alert(`Valid QR Code Scanned for Station ${receivedStation}`);
            let queryParam = decodedText.substring(
                decodedText.length - 2,
                decodedText.length - 1
            );
            // Redirect after alert is dismissed
            window.location.replace(
                "stampcard.html?qrcode=" + codes[queryParam - 1]
            );
        } else {
            alert("Wrong Station QR Code Scanned");
        }
    } else {
        alert("Invalid QR Code Scanned");
    }
}

function onScanFailure(error) {
    console.warn("Scan error: ", error);
}

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const pageTitle = document.getElementById("pageTitle");
    const station = params.get("station");
    const titles = [
        "Sustainability Meets Fashion",
        "Cap & Create",
        "HealthIQ",
        "Bin It Right!",
        "Stress Less, Waste Less",
    ];

    if (["1", "2", "3", "4", "5"].includes(station)) {
        pageTitle.innerHTML = titles[Number(station) - 1];
        const desc = document.getElementById(`pageDescription${station}`);
        desc.classList.remove("hidden");
    } else {
        window.location.href = "index.html";
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error("getUserMedia is not supported in this browser.");
        alert("Camera access is not supported on this device.");
        return;
    }

    navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
            console.log("Camera access granted.");

            // Stop the stream immediately (forces re-prompt if denied before)
            stream.getTracks().forEach((track) => track.stop());

            // Now initialize the QR scanner
            let html5QrCode = new Html5Qrcode("reader");
            html5QrCode.start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: function (viewfinderWidth, viewfinderHeight) {
                        let minSize =
                            Math.min(viewfinderWidth, viewfinderHeight) * 0.75;
                        return { width: minSize, height: minSize };
                    },
                },
                onScanSuccess,
                onScanFailure
            );
        })
        .catch((error) => {
            console.error("Camera access denied:", error);
            alert(
                "Camera access was denied. Please allow it in your browser settings."
            );
        });
});
