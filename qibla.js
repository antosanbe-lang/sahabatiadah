// Qibla Direction Calculation

class QiblaCalculator {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.kabaLatitude = 21.4225;
        this.kabaLongitude = 39.8262;
    }

    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    toDegrees(radians) {
        return radians * (180 / Math.PI);
    }

    calculateQiblaDirection() {
        const φ1 = this.toRadians(this.latitude);
        const φ2 = this.toRadians(this.kabaLatitude);
        const Δλ = this.toRadians(this.kabaLongitude - this.longitude);

        const y = Math.sin(Δλ) * Math.cos(φ2);
        const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

        const θ = Math.atan2(y, x);
        let bearing = this.toDegrees(θ);
        
        // Normalize to 0-360
        bearing = (bearing + 360) % 360;
        
        return bearing;
    }

    getDirectionName(degrees) {
        const directions = ['U (Utara)', 'TL (Timur Laut)', 'T (Timur)', 'TG (Tenggara)', 
                           'S (Selatan)', 'BL (Barat Laut)', 'B (Barat)', 'BB (Barat Barat)'];
        const index = Math.round(degrees / 45) % 8;
        return directions[index];
    }
}

// Major Indonesian coordinates for quick reference
const CITY_COORDINATES = {
    'jakarta': { lat: -6.2088, lon: 106.8456, name: 'Jakarta' },
    'bandung': { lat: -6.9175, lon: 107.6062, name: 'Bandung' },
    'surabaya': { lat: -7.2506, lon: 112.7508, name: 'Surabaya' },
    'yogyakarta': { lat: -7.7956, lon: 110.3695, name: 'Yogyakarta' },
    'medan': { lat: 3.1957, lon: 101.6869, name: 'Medan' },
    'semarang': { lat: -6.9667, lon: 110.4167, name: 'Semarang' },
    'palembang': { lat: -2.9761, lon: 104.7566, name: 'Palembang' },
    'makassar': { lat: -5.1477, lon: 119.4327, name: 'Makassar' },
    'pontianak': { lat: 0.0263, lon: 109.3425, name: 'Pontianak' },
    'kupang': { lat: -10.1772, lon: 123.5899, name: 'Kupang' },
    'manado': { lat: 1.4748, lon: 124.7744, name: 'Manado' },
    'banjarmasin': { lat: -3.3277, lon: 114.5949, name: 'Banjarmasin' },
    'lampung': { lat: -5.3971, lon: 105.2668, name: 'Lampung' },
    'padang': { lat: -0.9471, lon: 100.4172, name: 'Padang' },
    'batam': { lat: 1.1449, lon: 104.0087, name: 'Batam' }
};

let compassDeviceOrientation = null;

// Request permission for device orientation (required for iOS 13+)
function requestDeviceOrientationPermission() {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', handleDeviceOrientation);
                }
            })
            .catch(console.error);
    } else {
        // Non-iOS 13+ devices
        window.addEventListener('deviceorientation', handleDeviceOrientation);
    }
}

// Handle device orientation
function handleDeviceOrientation(event) {
    const alpha = event.alpha; // Z axis rotation (0-360)
    const beta = event.beta;   // X axis rotation (-180 to 180)
    const gamma = event.gamma; // Y axis rotation (-90 to 90)

    // alpha is the compass heading
    compassDeviceOrientation = alpha;
}

// Get device heading
function getDeviceHeading() {
    return compassDeviceOrientation !== null ? compassDeviceOrientation : 0;
}

// Calculate and update qibla display
function updateQiblaDirection(latitude, longitude) {
    const calculator = new QiblaCalculator(latitude, longitude);
    const qiblaAngle = calculator.calculateQiblaDirection();
    const directionName = calculator.getDirectionName(qiblaAngle);
    
    return {
        angle: qiblaAngle,
        direction: directionName,
        calculator: calculator
    };
}

// Adjust needle based on device orientation
function adjustQiblaNeedle(qiblaAngle, deviceHeading = 0) {
    const adjustedAngle = (qiblaAngle - deviceHeading + 360) % 360;
    return adjustedAngle;
}

// Initialize compass with geolocation
function initializeCompass() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                
                // Store for use in main app
                window.userLocation = { latitude, longitude };
                window.dispatchEvent(new CustomEvent('locationReady', { detail: { latitude, longitude } }));
            },
            error => {
                console.log('Geolocation error:', error);
                // Use default location (Jakarta)
                window.userLocation = { latitude: -6.2088, longitude: 106.8456 };
                window.dispatchEvent(new CustomEvent('locationReady', { detail: window.userLocation }));
            }
        );
    }
    
    // Request device orientation permission
    requestDeviceOrientationPermission();
}

// Get city name from coordinates
function getCityName(latitude, longitude) {
    let closestCity = null;
    let closestDistance = Infinity;
    
    for (let city in CITY_COORDINATES) {
        const coord = CITY_COORDINATES[city];
        const distance = Math.sqrt(
            Math.pow(latitude - coord.lat, 2) + Math.pow(longitude - coord.lon, 2)
        );
        
        if (distance < closestDistance) {
            closestDistance = distance;
            closestCity = coord.name;
        }
    }
    
    return closestCity || 'Lokasi Anda';
}
