// Dhikr Data - Morning and Evening Supplications

const MORNING_DHIKR = [
    {
        id: 1,
        title: 'Subhanallah (Glorification)',
        arabic: 'سُبْحَانَ اللَّهُ',
        transliteration: 'Subhana-llah',
        translation: 'Agungan bagi Allah',
        meaning: 'Glorifying Allah and declaring His perfection',
        count: 33,
        category: 'Tasbih'
    },
    {
        id: 2,
        title: 'Alhamdulillah (Praise)',
        arabic: 'الْحَمْدُ لِلَّهِ',
        transliteration: 'Al-hamdu lillah',
        translation: 'Segala puji bagi Allah',
        meaning: 'Praising Allah for all His blessings',
        count: 33,
        category: 'Tahmid'
    },
    {
        id: 3,
        title: 'Allahu Akbar (Greatness)',
        arabic: 'اللَّهُ أَكْبَرُ',
        transliteration: 'Allahu Akbar',
        translation: 'Allah adalah yang Terbesar',
        meaning: 'Declaring the greatness of Allah',
        count: 34,
        category: 'Takbir'
    },
    {
        id: 4,
        title: 'La Ilaha Illallah (Tawheed)',
        arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ',
        transliteration: 'La ilaha illallah',
        translation: 'Tidak ada tuhan selain Allah',
        meaning: 'Declaration of Islamic faith (Shahada)',
        count: 10,
        category: 'Tawheed'
    },
    {
        id: 5,
        title: 'Ayat al-Kursi (Verse of the Throne)',
        arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...',
        transliteration: 'Allahu la ilaha illa huwa al-Hayy al-Qayyum...',
        translation: 'Allah, tidak ada Tuhan selain Dia, Yang Hidup kekal lagi terus menerus mengurus...',
        meaning: 'The most important verse in the Quran, providing protection',
        count: 1,
        category: 'Quranic'
    },
    {
        id: 6,
        title: 'Dua for Protection',
        arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
        transliteration: 'Bismillah alladhi la yadurru ma\'a asmihi shay\'un fi al-ard wa la fi as-sama wa huwa as-Sami\' al-\'Alim',
        translation: 'Dengan nama Allah yang dengan nama-Nya tidak ada yang membahayakan di bumi maupun di langit, dan Dia adalah Yang Mendengar lagi Maha Mengetahui',
        meaning: 'Seeking protection from Allah against harm and evil',
        count: 3,
        category: 'Protection'
    },
    {
        id: 7,
        title: 'Dua Pagi (Morning Supplication)',
        arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ الْحَمْدُ لِلَّهِ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
        transliteration: 'Asbahna wa asbah al-mulk lillah, al-hamdu lillah, la ilaha illallah wahdahu la sharika lah, lahul-mulk wa lahul-hamd wa huwa \'ala kulli shay\'in qadir',
        translation: 'Kami memasuki pagi dan kerajaan adalah milik Allah. Segala puji bagi Allah. Tidak ada tuhan selain Allah, Yang Satu, tiada sekutu bagiNya. Milik-Nya kerajaan dan milik-Nya pujian, dan Dia Mahakuasa atas segala sesuatu',
        meaning: 'Beginning the day with gratitude and affirmation of Allah\'s sovereignty',
        count: 1,
        category: 'Daily'
    },
    {
        id: 8,
        title: 'Dua for Forgiveness',
        arabic: 'استغفر اللهَ العظيم، الذي لا إله إلا هو الحي القيوم وأتوب إليه',
        transliteration: 'Astaghfirullaha al-\'azim, allathi la ilaha illahu al-hayy al-qayyum wa atubu ilayh',
        translation: 'Aku memohon ampun kepada Allah Yang Maha Agung, yang tiada Tuhan selain Dia, Yang Hidup dan Terus Menerus berdiri sendiri, dan aku bertaubat kepadaNya',
        meaning: 'Seeking forgiveness from Allah for sins and mistakes',
        count: 3,
        category: 'Forgiveness'
    },
    {
        id: 9,
        title: 'Salat al-Fatihah (Fatiha Prayer)',
        arabic: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَىٰ نَبِيِّنَا مُحَمَّدٍ',
        transliteration: 'Allahumma salli wa sallim \'ala nabiyyina Muhammad',
        translation: 'Ya Allah, limpahkanlah shalawat dan salammu kepada nabi kami Muhammad',
        meaning: 'Sending blessings upon the Prophet Muhammad',
        count: 10,
        category: 'Prophet'
    }
];

const EVENING_DHIKR = [
    {
        id: 1,
        title: 'Subhanallah (Glorification)',
        arabic: 'سُبْحَانَ اللَّهُ',
        transliteration: 'Subhana-llah',
        translation: 'Agungan bagi Allah',
        meaning: 'Glorifying Allah and declaring His perfection',
        count: 33,
        category: 'Tasbih'
    },
    {
        id: 2,
        title: 'Alhamdulillah (Praise)',
        arabic: 'الْحَمْدُ لِلَّهِ',
        transliteration: 'Al-hamdu lillah',
        translation: 'Segala puji bagi Allah',
        meaning: 'Praising Allah for all His blessings and the day',
        count: 33,
        category: 'Tahmid'
    },
    {
        id: 3,
        title: 'Allahu Akbar (Greatness)',
        arabic: 'اللَّهُ أَكْبَرُ',
        transliteration: 'Allahu Akbar',
        translation: 'Allah adalah yang Terbesar',
        meaning: 'Declaring the greatness of Allah',
        count: 34,
        category: 'Takbir'
    },
    {
        id: 4,
        title: 'La Ilaha Illallah (Tawheed)',
        arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ',
        transliteration: 'La ilaha illallah',
        translation: 'Tidak ada tuhan selain Allah',
        meaning: 'Declaration of Islamic faith',
        count: 10,
        category: 'Tawheed'
    },
    {
        id: 5,
        title: 'Ayat al-Kursi (Verse of the Throne)',
        arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...',
        transliteration: 'Allahu la ilaha illa huwa al-Hayy al-Qayyum...',
        translation: 'Allah, tidak ada Tuhan selain Dia, Yang Hidup kekal lagi terus menerus mengurus...',
        meaning: 'The most important verse in the Quran, providing protection during the night',
        count: 1,
        category: 'Quranic'
    },
    {
        id: 6,
        title: 'Dua for Evening Protection',
        arabic: 'أَمْسَيْنَا وَأَمْسَىٰ الْمُلْكُ لِلَّهِ الْحَمْدُ لِلَّهِ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
        transliteration: 'Amsayna wa amsa al-mulk lillah, al-hamdu lillah, la ilaha illallah wahdahu la sharika lah',
        translation: 'Kami memasuki malam dan kerajaan adalah milik Allah. Segala puji bagi Allah. Tidak ada tuhan selain Allah, Yang Satu, tiada sekutu bagiNya',
        meaning: 'Seeking Allah\'s protection as night arrives',
        count: 1,
        category: 'Protection'
    },
    {
        id: 7,
        title: 'Surat Al-Ikhlas x3',
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ اللَّهُ الصَّمَدُ لَمْ يَلِدْ وَلَمْ يُولَدْ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
        transliteration: 'Qul huwa Allahu ahad, Allahu as-samad, lam yalid wa lam yulad, wa lam yakun lahu kufuwan ahad',
        translation: 'Katakanlah: "Dia-lah Allah, Yang Satu, Allah-lah Tuhan yang bergantung padaNya segala sesuatu, Dia tiada beranak dan tiada pula diperanakkan, dan tidak ada sesuatupun yang setara dengan Dia"',
        meaning: 'Declaration of Allah\'s oneness and uniqueness',
        count: 3,
        category: 'Quranic'
    },
    {
        id: 8,
        title: 'Surat Al-Falaq',
        arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
        transliteration: 'Qul a\'uzu bi rabbi al-falaq',
        translation: 'Katakanlah: "Aku berlindung dengan Tuhan pagi hari (yang memecah cahaya)"',
        meaning: 'Seeking protection from evil and harmful things',
        count: 1,
        category: 'Protection'
    },
    {
        id: 9,
        title: 'Surat An-Nas',
        arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
        transliteration: 'Qul a\'uzu bi rabbi an-nas',
        translation: 'Katakanlah: "Aku berlindung dengan Tuhan manusia"',
        meaning: 'Protection from whispers of Satan',
        count: 1,
        category: 'Protection'
    },
    {
        id: 10,
        title: 'Dua for Forgiveness at Night',
        arabic: 'استغفر اللهَ العظيم، الذي لا إله إلا هو الحي القيوم وأتوب إليه',
        transliteration: 'Astaghfirullaha al-\'azim, allathi la ilaha illahu al-hayy al-qayyum wa atubu ilayh',
        translation: 'Aku memohon ampun kepada Allah Yang Maha Agung, yang tiada Tuhan selain Dia, Yang Hidup dan Terus Menerus berdiri sendiri, dan aku bertaubat kepadaNya',
        meaning: 'Seeking forgiveness before sleep and rest',
        count: 3,
        category: 'Forgiveness'
    },
    {
        id: 11,
        title: 'Dua for Sleep',
        arabic: 'اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا',
        transliteration: 'Allahumma bi-asmika amutu wa ahya',
        translation: 'Ya Allah, dengan nama-Mu aku mati dan aku hidup',
        meaning: 'Before going to sleep, entrusting oneself to Allah',
        count: 1,
        category: 'Daily'
    },
    {
        id: 12,
        title: 'Salat al-Fatihah (Evening Prayer)',
        arabic: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَىٰ نَبِيِّنَا مُحَمَّدٍ',
        transliteration: 'Allahumma salli wa sallim \'ala nabiyyina Muhammad',
        translation: 'Ya Allah, limpahkanlah shalawat dan salammu kepada nabi kami Muhammad',
        meaning: 'Sending blessings upon the Prophet Muhammad in the evening',
        count: 10,
        category: 'Prophet'
    }
];

// Function to get dhikr by type
function getDhikrList(type) {
    return type === 'morning' ? MORNING_DHIKR : EVENING_DHIKR;
}

// Function to get total recommended count
function getTotalDhikrCount(dhikrList) {
    return dhikrList.reduce((total, item) => total + item.count, 0);
}

// Function to get dhikr by category
function getDhikrByCategory(dhikrList, category) {
    return dhikrList.filter(item => item.category === category);
}
