// Main Application Logic

// State management
const appState = {
    currentLocation: null,
    currentPrayerTimes: null,
    currentQiblaAngle: null,
    dhikrCounts: {},
    selectedTab: 'prayer-times'
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    // Set up tab navigation
    setupTabNavigation();
    
    // Get user location
    getUserLocation();
    
    // Initialize compass
    initializeCompass();
    
    // Set current date
    updateDateDisplay();
    
    // Initialize dhikr display
    displayDhikrItems('morning');
    
    // Update prayer times periodically
    updatePrayerDisplay();
    setInterval(updatePrayerDisplay, 60000); // Update every minute
}

// Open Admin Dashboard
function openAdminDashboard() {
    window.open('admin-dashboard.html', 'adminDashboard', 'width=1200,height=800');
}

// Tab Navigation
function setupTabNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            navTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(tabName).classList.add('active');
            
            appState.selectedTab = tabName;
            
            // Handle special initialization for certain tabs
            if (tabName === 'qibla') {
                updateQiblaDisplay();
            } else if (tabName === 'evening-dhikr') {
                displayDhikrItems('evening');
            }
        });
    });
}

// Get user location
function getUserLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                
                appState.currentLocation = { latitude, longitude };
                
                // Update city name
                const cityName = getCityName(latitude, longitude);
                document.getElementById('cityName').textContent = cityName;
                
                // Update prayer times
                updatePrayerDisplay();
                
                // Update qibla direction
                updateQiblaDisplay();
            },
            error => {
                console.log('Using default location: Jakarta');
                // Use default location (Jakarta)
                appState.currentLocation = { latitude: -6.2088, longitude: 106.8456 };
                document.getElementById('cityName').textContent = 'Jakarta (Default)';
                updatePrayerDisplay();
                updateQiblaDisplay();
            }
        );
    } else {
        // Fallback to Jakarta
        appState.currentLocation = { latitude: -6.2088, longitude: 106.8456 };
        document.getElementById('cityName').textContent = 'Jakarta (Default)';
        updatePrayerDisplay();
        updateQiblaDisplay();
    }
}

// Update date display
function updateDateDisplay() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const gregorianDate = now.toLocaleDateString('id-ID', options);
    const hijriDate = getHijriDate(now);
    
    document.getElementById('currentDate').textContent = gregorianDate;
    document.getElementById('hijriDate').textContent = hijriDate;
}

// Update prayer times display
function updatePrayerDisplay() {
    if (!appState.currentLocation) return;
    
    const { latitude, longitude } = appState.currentLocation;
    const times = getPrayerTimes(latitude, longitude);
    
    appState.currentPrayerTimes = times;
    
    // Update prayer time displays
    document.getElementById('fajrTime').textContent = times.fajr;
    document.getElementById('syuruqTime').textContent = times.syuruq || '05:30';
    document.getElementById('dhuhrTime').textContent = times.dhuhr;
    document.getElementById('asrTime').textContent = times.asr;
    document.getElementById('maghribTime').textContent = times.maghrib;
    document.getElementById('ishaTime').textContent = times.isha;
    
    // Update next prayer info
    updateNextPrayerDisplay(times);
}

// Update next prayer countdown
function updateNextPrayerDisplay(times) {
    const nextPrayer = getNextPrayer(times);
    const timeUntil = getTimeUntilPrayer(nextPrayer.time);
    
    document.getElementById('nextPrayerName').textContent = nextPrayer.name;
    document.getElementById('nextPrayerTime').textContent = nextPrayer.time;
    
    const countdownText = timeUntil.hours > 0 
        ? `${timeUntil.hours}j ${timeUntil.minutes}m`
        : `${timeUntil.minutes}m`;
    
    document.getElementById('nextPrayerCountdown').textContent = countdownText;
}

// Update Qibla display
function updateQiblaDisplay() {
    if (!appState.currentLocation) return;
    
    const { latitude, longitude } = appState.currentLocation;
    const qiblaInfo = updateQiblaDirection(latitude, longitude);
    
    appState.currentQiblaAngle = qiblaInfo.angle;
    
    // Update angle display
    document.getElementById('qiblaAngle').textContent = Math.round(qiblaInfo.angle) + '°';
    
    // Update qibla needle
    const needle = document.getElementById('qiblaArrow');
    const deviceHeading = getDeviceHeading();
    const adjustedAngle = adjustQiblaNeedle(qiblaInfo.angle, deviceHeading);
    
    needle.style.transform = `translateX(-50%) rotate(${adjustedAngle}deg)`;
    
    // Update location info
    document.getElementById('qiblaLocation').textContent = getCityName(latitude, longitude);
    document.getElementById('qiblaLat').textContent = latitude.toFixed(4);
    document.getElementById('qiblaLon').textContent = longitude.toFixed(4);
    document.getElementById('qiblaDirection').textContent = qiblaInfo.direction;
    
    // Update qibla direction periodically based on device orientation
    const qiblaUpdateInterval = setInterval(() => {
        if (appState.selectedTab !== 'qibla') {
            clearInterval(qiblaUpdateInterval);
            return;
        }
        
        const newDeviceHeading = getDeviceHeading();
        const newAdjustedAngle = adjustQiblaNeedle(qiblaInfo.angle, newDeviceHeading);
        needle.style.transform = `translateX(-50%) rotate(${newAdjustedAngle}deg)`;
    }, 100);
}

// Display dhikr items
function displayDhikrItems(type) {
    const dhikrList = getDhikrList(type);
    const containerId = type === 'morning' ? 'morningDhikrList' : 'eveningDhikrList';
    const container = document.getElementById(containerId);
    
    container.innerHTML = '';
    
    dhikrList.forEach(dhikr => {
        const dhikrElement = createDhikrElement(dhikr, type);
        container.appendChild(dhikrElement);
    });
}

// Create dhikr element
function createDhikrElement(dhikr, type) {
    const countKey = `${type}_${dhikr.id}`;
    const currentCount = appState.dhikrCounts[countKey] || 0;
    const isCompleted = currentCount >= dhikr.count;
    
    const div = document.createElement('div');
    div.className = `dhikr-item ${isCompleted ? 'completed' : ''}`;
    div.id = `dhikr-${type}-${dhikr.id}`;
    
    div.innerHTML = `
        <div class="dhikr-header-item">
            <div class="dhikr-number">${dhikr.id}</div>
            <div class="dhikr-title">${dhikr.title}</div>
        </div>
        
        <div class="dhikr-text">${dhikr.arabic}</div>
        
        <div class="dhikr-translation">"${dhikr.translation}"</div>
        
        <div class="dhikr-meaning"><strong>Arti:</strong> ${dhikr.meaning}</div>
        
        <div class="dhikr-count">
            <div class="count-info">
                <span id="count-${type}-${dhikr.id}">0</span> / ${dhikr.count} kali
            </div>
            <div class="count-buttons">
                <button class="count-btn" onclick="incrementDhikrCount('${type}', ${dhikr.id})">
                    <i class="fas fa-plus"></i> Tambah
                </button>
                <button class="count-btn reset" onclick="resetDhikrCount('${type}', ${dhikr.id})">
                    <i class="fas fa-redo"></i> Reset
                </button>
            </div>
        </div>
    `;
    
    return div;
}

// Increment dhikr count
function incrementDhikrCount(type, dhikrId) {
    const countKey = `${type}_${dhikrId}`;
    const dhikrList = getDhikrList(type);
    const dhikr = dhikrList.find(d => d.id === dhikrId);
    
    if (!appState.dhikrCounts[countKey]) {
        appState.dhikrCounts[countKey] = 0;
    }
    
    if (appState.dhikrCounts[countKey] < dhikr.count) {
        appState.dhikrCounts[countKey]++;
    }
    
    updateDhikrDisplay(type, dhikrId);
    saveDhikrState();
    
    // Play sound effect if available
    playClickSound();
}

// Reset dhikr count
function resetDhikrCount(type, dhikrId) {
    const countKey = `${type}_${dhikrId}`;
    appState.dhikrCounts[countKey] = 0;
    
    updateDhikrDisplay(type, dhikrId);
    saveDhikrState();
}

// Update dhikr display after count change
function updateDhikrDisplay(type, dhikrId) {
    const countKey = `${type}_${dhikrId}`;
    const dhikrList = getDhikrList(type);
    const dhikr = dhikrList.find(d => d.id === dhikrId);
    const currentCount = appState.dhikrCounts[countKey] || 0;
    
    // Update count display
    const countElement = document.getElementById(`count-${type}-${dhikrId}`);
    if (countElement) {
        countElement.textContent = currentCount;
    }
    
    // Update item completion status
    const dhikrElement = document.getElementById(`dhikr-${type}-${dhikrId}`);
    if (dhikrElement) {
        if (currentCount >= dhikr.count) {
            dhikrElement.classList.add('completed');
        } else {
            dhikrElement.classList.remove('completed');
        }
    }
}

// Play click sound effect
function playClickSound() {
    // Create a simple beep sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gain.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        console.log('Audio not supported');
    }
}

// Save dhikr state to localStorage
function saveDhikrState() {
    localStorage.setItem('dhikrCounts', JSON.stringify(appState.dhikrCounts));
}

// Load dhikr state from localStorage
function loadDhikrState() {
    const saved = localStorage.getItem('dhikrCounts');
    if (saved) {
        appState.dhikrCounts = JSON.parse(saved);
    }
}

// Handle device orientation for qibla
document.addEventListener('deviceorientation', function(event) {
    if (appState.selectedTab === 'qibla') {
        const qiblaInfo = updateQiblaDirection(
            appState.currentLocation.latitude,
            appState.currentLocation.longitude
        );
        
        const needle = document.getElementById('qiblaArrow');
        const deviceHeading = event.alpha || 0;
        const adjustedAngle = adjustQiblaNeedle(qiblaInfo.angle, deviceHeading);
        
        needle.style.transform = `translateX(-50%) rotate(${adjustedAngle}deg)`;
    }
});

// Load saved state on init
window.addEventListener('load', function() {
    loadDhikrState();
    if (Object.keys(appState.dhikrCounts).length > 0) {
        displayDhikrItems('morning');
    }
});

// Update date every minute
setInterval(updateDateDisplay, 60000);
