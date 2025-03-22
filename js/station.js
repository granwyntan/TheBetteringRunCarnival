if (sessionStorage.getItem("pointsRedeemed") === "true") {
    // Redirect to another page if redemption is already completed
    window.location.href = "redeemed.html"; // Change to the appropriate page
}

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
                decodedText.length - 9,
                decodedText.length - 1
            );
            // Redirect after alert is dismissed
            window.location.replace("stampcard.html?" + queryParam);
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
    const station = params.get("station");

    let stationName = document.querySelector(".stationName");
    stationName.textContent = `Station ${station}`;

    document.title = `The Bettering Run Carnival | Station ${station}`;

    //TODO: Change Text Content of .stationDescription

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
