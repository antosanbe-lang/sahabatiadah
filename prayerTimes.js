// Prayer Times Calculation using Adhan Method
// This implements the Islamic Society of North America (ISNA) calculation method

class PrayerTimes {
    constructor(latitude, longitude, timezone, date = new Date()) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.timezone = timezone;
        this.date = date;
    }

    // Get Julian date
    getJulianDate(date) {
        const a = Math.floor((14 - (date.getMonth() + 1)) / 12);
        const y = date.getFullYear() + 4800 - a;
        const m = (date.getMonth() + 1) + 12 * a - 3;
        return date.getDate() + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    }

    // Calculate prayer times
    calculate() {
        const julianDate = this.getJulianDate(this.date);
        const N = julianDate - 2451544.5 + 0.0008;

        const J2000 = N / 36525;
        const L0 = 280.4664567 + (36000.76982779 * J2000) + (0.0003032028 * J2000 * J2000) + (J2000 * J2000 * J2000 / 49010);
        const e = 0.016708634 + (-0.000042037 * J2000) - (0.0000001267 * J2000 * J2000);
        const M = 357.52910918 + (35999.05029094 * J2000);
        const C = (1.914602442 - 0.004817359 * J2000 - 0.000014421 * J2000 * J2000) * Math.sin(this.toRadians(M)) + (0.019993055 - 0.000101298 * J2000) * Math.sin(this.toRadians(2 * M)) + 0.000289053 * Math.sin(this.toRadians(3 * M));
        const sunLongitude = (L0 + C) % 360;
        const sunAltitude = Math.asin(Math.sin(this.toRadians(-0.83)) / Math.sin(this.toRadians(Math.abs(this.latitude - 1)))) * (180 / Math.PI);

        // Standard angles for ISNA method
        const fajrAngle = 15;
        const ishaAngle = 15;

        const times = {
            fajr: this.getSunTime(sunLongitude, fajrAngle, true),
            sunrise: this.getSunTime(sunLongitude, 0.833, true),
            dhuhr: this.getDhuhr(julianDate),
            asr: this.getAsr(julianDate),
            sunset: this.getSunTime(sunLongitude, 0.833, false),
            isha: this.getSunTime(sunLongitude, ishaAngle, false)
        };

        return times;
    }

    getDhuhr(julianDate) {
        // Simplified Dhuhr calculation
        const hours = 12 + (this.longitude / 15) - (this.timezone);
        return this.convertToTime(hours);
    }

    getAsr(julianDate) {
        // Simplified Asr calculation (assuming time after Dhuhr)
        const dhuhr = this.getDhuhr(julianDate);
        const [dhuhrHours, dhuhrMins] = dhuhr.split(':').map(Number);
        const asrHours = dhuhrHours + 4; // Approximate 4 hours after Dhuhr
        return this.convertToTime(asrHours + dhuhrMins / 60);
    }

    getSunTime(sunLongitude, angle, isMorning) {
        // Simplified sun time calculation
        const angle_rad = this.toRadians(angle);
        const lat_rad = this.toRadians(this.latitude);
        
        const cosH = -Math.tan(lat_rad) * Math.tan(angle_rad);
        const H = cosH > 1 ? 0 : cosH < -1 ? 180 : Math.acos(cosH) * (180 / Math.PI);
        
        let hours = (isMorning ? 12 - H / 15 : 12 + H / 15) - (this.longitude / 15) + this.timezone;
        
        return this.convertToTime(hours);
    }

    convertToTime(hours) {
        hours = (hours + 24) % 24;
        const h = Math.floor(hours);
        const m = Math.floor((hours - h) * 60);
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    }

    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
}

// Fallback prayer times for major Indonesian cities
const PRAYER_TIMES_DATA = {
    jakarta: {
        latitude: -6.2088,
        longitude: 106.8456,
        times: {
            fajr: '04:30',
            syuruq: '05:52',
            dhuhr: '12:00',
            asr: '15:30',
            maghrib: '18:08',
            isha: '19:25'
        }
    },
    bandung: {
        latitude: -6.9175,
        longitude: 107.6062,
        times: {
            fajr: '04:38',
            syuruq: '05:58',
            dhuhr: '12:07',
            asr: '15:40',
            maghrib: '18:15',
            isha: '19:30'
        }
    },
    surabaya: {
        latitude: -7.2506,
        longitude: 112.7508,
        times: {
            fajr: '04:21',
            syuruq: '05:44',
            dhuhr: '11:47',
            asr: '15:10',
            maghrib: '17:50',
            isha: '19:06'
        }
    },
    yogyakarta: {
        latitude: -7.7956,
        longitude: 110.3695,
        times: {
            fajr: '04:28',
            syuruq: '05:50',
            dhuhr: '11:55',
            asr: '15:20',
            maghrib: '17:58',
            isha: '19:14'
        }
    },
    medan: {
        latitude: 3.1957,
        longitude: 101.6869,
        times: {
            fajr: '05:02',
            syuruq: '06:20',
            dhuhr: '12:17',
            asr: '15:45',
            maghrib: '18:13',
            isha: '19:30'
        }
    },
    semarang: {
        latitude: -6.9667,
        longitude: 110.4167,
        times: {
            fajr: '04:32',
            syuruq: '05:54',
            dhuhr: '11:58',
            asr: '15:20',
            maghrib: '17:55',
            isha: '19:10'
        }
    },
    palembang: {
        latitude: -2.9761,
        longitude: 104.7566,
        times: {
            fajr: '04:56',
            syuruq: '06:15',
            dhuhr: '12:12',
            asr: '15:40',
            maghrib: '18:08',
            isha: '19:25'
        }
    },
    makassar: {
        latitude: -5.1477,
        longitude: 119.4327,
        times: {
            fajr: '04:42',
            syuruq: '06:04',
            dhuhr: '11:54',
            asr: '15:15',
            maghrib: '17:43',
            isha: '18:59'
        }
    }
};

// Function to get prayer times
function getPrayerTimes(latitude, longitude, city = null) {
    // If city is provided and available, use stored data
    if (city && PRAYER_TIMES_DATA[city.toLowerCase()]) {
        return PRAYER_TIMES_DATA[city.toLowerCase()].times;
    }
    
    // Otherwise use calculation
    const timezone = 7; // WIB (UTC+7)
    const prayerCalculator = new PrayerTimes(latitude, longitude, timezone);
    return prayerCalculator.calculate();
}

// Function to get Hijri date
function getHijriDate(gregorianDate = new Date()) {
    // Simplified Hijri date calculation
    const g = gregorianDate.getFullYear();
    const m = gregorianDate.getMonth() + 1;
    const d = gregorianDate.getDate();
    
    const julianDay = Math.floor((1461 * (g + 4800 + Math.floor((m - 14) / 12))) / 4) +
                      Math.floor((367 * (m - 2 - 12 * Math.floor((m - 14) / 12))) / 12) -
                      Math.floor((3 * Math.floor((g + 4900 + Math.floor((m - 14) / 12)) / 100)) / 4) +
                      d - 32075;
    
    const hijriAdjustment = julianDay - 1948440 + 0.5;
    const n = Math.floor(hijriAdjustment);
    const q = Math.floor((30 * n + 10646) / 10631.0);
    const r = Math.floor((n + Math.floor(q / 30)) % 30) + 1;
    const h = Math.floor((10646 + 30 * Math.floor(q / 30) + r - 1) / 10631);
    
    const hijriMonth = (h + 2) % 12;
    const hijriYear = Math.floor(q / 30) + 1;
    const hijriDay = r;
    
    const monthNames = ['Muharram', 'Safar', 'Rabi\' al-awwal', 'Rabi\' al-thani', 'Jumada al-awwal', 'Jumada al-thani',
                        'Rajab', 'Sha\'ban', 'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'];
    
    return `${hijriDay} ${monthNames[hijriMonth]} ${hijriYear} H`;
}

// Function to format time difference
function getTimeUntilPrayer(prayerTime) {
    const [prayerHours, prayerMins] = prayerTime.split(':').map(Number);
    const now = new Date();
    const prayerDate = new Date();
    prayerDate.setHours(prayerHours, prayerMins, 0);
    
    let diff = prayerDate - now;
    
    // If prayer time has passed, show time until next day
    if (diff < 0) {
        prayerDate.setDate(prayerDate.getDate() + 1);
        diff = prayerDate - now;
    }
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { hours, minutes, diff };
}

// Function to find next prayer
function getNextPrayer(times) {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMins = now.getMinutes();
    const currentTime = currentHours * 60 + currentMins;
    
    const prayers = [
        { name: 'Subuh', time: times.fajr },
        { name: 'Dhuhur', time: times.dhuhr },
        { name: 'Ashar', time: times.asr },
        { name: 'Magrib', time: times.maghrib },
        { name: 'Isya', time: times.isha }
    ];
    
    for (let prayer of prayers) {
        const [h, m] = prayer.time.split(':').map(Number);
        const prayerTimeInMins = h * 60 + m;
        
        if (prayerTimeInMins > currentTime) {
            return prayer;
        }
    }
    
    // If no prayer found, next is Fajr tomorrow
    return { name: 'Subuh', time: times.fajr };
}
