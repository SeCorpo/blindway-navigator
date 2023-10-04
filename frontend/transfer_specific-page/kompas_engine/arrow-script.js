// Function to update the arrow's rotation based on device orientation and target location
function updateArrowRotation(event, targetLocation) {
    const arrow = document.getElementById('arrow');
    const alpha = event.alpha; // Rotation around z-axis (0 to 360 degrees)

    if (alpha !== null) {
        const userLocation = {
            latitude: parseFloat(document.getElementById('latitude').value),
            longitude: parseFloat(document.getElementById('longitude').value),
        };

        if (!isNaN(userLocation.latitude) && !isNaN(userLocation.longitude)) {
            const targetRotation = calculateRotation(userLocation, targetLocation, alpha);
            arrow.style.transform = `translate(-50%, -50%) rotate(${targetRotation}deg)`;
        }
    }
}

// Calculate the arrow's rotation based on the user's current location, target location (Amsterdam), and device orientation
function calculateRotation(userLocation, targetLocation, alpha) {
    const userLatitudeRadians = toRadians(userLocation.latitude);
    const userLongitudeRadians = toRadians(userLocation.longitude);
    const targetLatitudeRadians = toRadians(targetLocation.latitude);
    const targetLongitudeRadians = toRadians(targetLocation.longitude);

    const deltaLongitude = targetLongitudeRadians - userLongitudeRadians;

    const y = Math.sin(deltaLongitude) * Math.cos(targetLatitudeRadians);
    const x =
        Math.cos(userLatitudeRadians) * Math.sin(targetLatitudeRadians) -
        Math.sin(userLatitudeRadians) * Math.cos(targetLatitudeRadians) * Math.cos(deltaLongitude);

    const angleRadians = Math.atan2(y, x);
    return angleRadians * (180 / Math.PI) - alpha;
}

// Helper function to convert degrees to radians
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Check if the device supports the DeviceOrientation event
if ('ondeviceorientation' in window) {
    // Add an event listener to track device orientation changes
    window.addEventListener('deviceorientation', (event) => {
        const targetLocation = {
            latitude: parseFloat(document.getElementById('latitude').value),
            longitude: parseFloat(document.getElementById('longitude').value),
        };
        updateArrowRotation(event, targetLocation);
    });
} else {
    alert("Device orientation is not supported on this device.");
}
// Add an event listener to the "Update Location" button
document.getElementById('updateLocation').addEventListener('click', () => {
    const latitudeInput = document.getElementById('latitude').value;
    const longitudeInput = document.getElementById('longitude').value;

    if (isNaN(parseFloat(latitudeInput)) || isNaN(parseFloat(longitudeInput))) {
        alert("Please enter valid latitude and longitude values.");
    }
});