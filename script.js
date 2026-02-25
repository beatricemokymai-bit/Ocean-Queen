let audioPlayer;
let isPlaying = false;
let currentLang = 'lt';

const translations = {
    lt: {
        title: 'AI Avataro Kūrimo Procesas',
        subtitle: 'Edukacinis gidas: nuo vaizdo iki kalbančio vandenynų sargo',
        step1_title: 'Nuotrauka',
        step1_text: 'Naudodamas AI įrankius (pvz., ChatGPT arba Gemini), sugeneravau avataro vizualą vandenynų tema.',
        step2_title: 'Audio įrašas',
        step2_text: 'Paruošiau tekstą apie vandenynų išsaugojimą ir paverčiau jį balsu per ElevenLabs.',
        step3_title: 'Video rezultatas',
        step3_text: 'Sujungiau nuotrauką ir audio naudodamas D-ID arba HeyGen įrankį.',
        summary_title: 'Kaip sukurti savo skaitmeninį vandenyno sargą?',
        summary_text: 'Sukurti unikalų <span class="summary-keyword">AI avatarą</span> yra paprasčiau nei atrodo. Visas procesas prasideda nuo vizualinės idėjos – naudodami <span class="summary-keyword">ChatGPT</span> arba <span class="summary-keyword">Gemini</span> aprašome savo viziją. Gavę vaizdą, suteikiame jam balsą per <span class="summary-keyword">ElevenLabs</span>. Galiausiai, pasitelkiame <span class="summary-keyword">D-ID</span> arba <span class="summary-keyword">HeyGen</span> įrankius, kurie sujungia viską į gyvą, kalbantį avatarą!',
        audio_play: 'Klausyti garso',
        audio_stop: 'Sustabdyti',
        final_button: 'Proceso apžvalga',
        final_alert: 'Visas procesas buvo atliktas naudojant Cursor ir AI įrankius per vieną sesiją!',
        video_fallback: 'Jūsų naršyklė nepalaiko HTML5 video.'
    },
    en: {
        title: 'AI Avatar Creation Process',
        subtitle: 'Educational guide: from image to talking ocean guardian',
        step1_title: 'Image',
        step1_text: 'Using AI tools (e.g., ChatGPT or Gemini), I generated an ocean-themed avatar visual.',
        step2_title: 'Audio track',
        step2_text: 'I wrote a short text about ocean conservation and turned it into a voice with ElevenLabs.',
        step3_title: 'Video result',
        step3_text: 'I combined the image and audio using tools like D-ID or HeyGen.',
        summary_title: 'How to create your own digital ocean guardian?',
        summary_text: 'Creating a unique <span class="summary-keyword">AI avatar</span> is easier than it looks. The whole journey starts with a visual idea – using <span class="summary-keyword">ChatGPT</span> or <span class="summary-keyword">Gemini</span>, we describe our vision in detail. Once the image is ready, we give it a voice with <span class="summary-keyword">ElevenLabs</span>. Finally, tools like <span class="summary-keyword">D-ID</span> or <span class="summary-keyword">HeyGen</span> bring everything together into a living, talking avatar!',
        audio_play: 'Play audio',
        audio_stop: 'Stop',
        final_button: 'Process overview',
        final_alert: 'The whole process was created in one session using Cursor and AI tools!',
        video_fallback: 'Your browser does not support HTML5 video.'
    }
};

function t(key) {
    const dict = translations[currentLang] || translations.lt;
    return dict[key] || translations.lt[key] || key;
}

function initAudio() {
    if (!audioPlayer) {
        // Kelias turi sutapti su tikru failo pavadinimu
        audioPlayer = new Audio('audio/vandenynusargas.mp3.mp3');

        audioPlayer.addEventListener('ended', () => {
            isPlaying = false;
            updateAudioButtonLabel();
        });

        audioPlayer.addEventListener('pause', () => {
            if (!audioPlayer.ended) {
                isPlaying = false;
                updateAudioButtonLabel();
            }
        });
    }
}

function toggleAudioPlayback() {
    initAudio();

    if (!audioPlayer) return;

    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
    } else {
        audioPlayer.play();
        isPlaying = true;
    }

    updateAudioButtonLabel();
}

function updateAudioButtonLabel() {
    const audioBtn = document.getElementById('audioBtn');
    if (!audioBtn) return;

    const label = audioBtn.querySelector('.audio-btn-label');
    const textKey = isPlaying ? 'audio_stop' : 'audio_play';
    const text = t(textKey);

    if (label) {
        label.textContent = text;
    } else {
        audioBtn.textContent = text;
    }

    audioBtn.classList.toggle('playing', isPlaying);
}

function applyTranslations() {
    const dict = translations[currentLang] || translations.lt;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
        const key = el.getAttribute('data-i18n-html');
        if (dict[key]) {
            el.innerHTML = dict[key];
        }
    });

    updateAudioButtonLabel();
}

function setLanguage(lang) {
    if (!translations[lang]) return;

    currentLang = lang;
    document.documentElement.lang = lang === 'lt' ? 'lt' : 'en';
    localStorage.setItem('lang', currentLang);

    document.querySelectorAll('.lang-btn').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });

    applyTranslations();
}

function initTheme() {
    const saved = localStorage.getItem('theme');
    const initial = saved === 'light' || saved === 'dark' ? saved : 'dark';

    document.body.setAttribute('data-theme', initial);
    document.body.classList.toggle('light-mode', initial === 'light');
    updateThemeIcon(initial);
}

function toggleTheme() {
    const current = document.body.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';

    document.body.setAttribute('data-theme', next);
    document.body.classList.toggle('light-mode', next === 'light');
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('themeIcon');
    if (!icon) return;

    icon.textContent = theme === 'light' ? '☀' : '☾';
}

window.addEventListener('DOMContentLoaded', () => {
    const finalBtn = document.getElementById('finalBtn');
    const audioBtn = document.getElementById('audioBtn');
    const themeToggle = document.getElementById('themeToggle');

    // Theme
    initTheme();
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Language
    const savedLang = localStorage.getItem('lang');
    const initialLang = savedLang && translations[savedLang] ? savedLang : 'lt';
    setLanguage(initialLang);

    document.querySelectorAll('.lang-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);
        });
    });

    // Buttons
    if (finalBtn) {
        finalBtn.addEventListener('click', () => {
            alert(t('final_alert'));
        });
    }

    if (audioBtn) {
        audioBtn.addEventListener('click', toggleAudioPlayback);
    }
});
