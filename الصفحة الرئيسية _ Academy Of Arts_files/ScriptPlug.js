/* =========================== Daem Accessibility Injector - No iframe (widget) - Injects DOM + CSS + JS =========================== */
// Capture script base URL immediately (document.currentScript only works at parse time)
const _daemScriptBase = (() =>
{
    const s = document.currentScript;
    if (!s || !s.src) return '';
    return s.src.substring(0, s.src.lastIndexOf('/') + 1);
})();

const plugHostingUrl2020 = "https://www.aoa.edu.eg"; // For Using Here And applyChange.js
const youTubeVideoLink = "https://www.youtube.com/embed/4od6UKqJJ0o";
//const scriptElementsdkURL = "**scriptElementsdkURL**";
const scriptApplayChanges = "/www_aoa_edu_eg_version_GAW_V2/Plugs/js/applyChange.js";
const src = "https://www.aoa.edu.eg/www_aoa_edu_eg_version_GAW_V2/Plugs/Languages/ar/plug.html";
const IconclassName = "the-btn Bottom_Left";

const array = scriptApplayChanges.split("/");
var match = "/" + array[1] + "/";

/**
 * Optional:
 * If you want to prefix all widget assets (fonts/images) with hosting base:
 * Example: plugHostingUrl2020 = https://example.com/
 * assets will become https://example.com/daem_assets/...
 */
const ASSETS_BASE = plugHostingUrl2020 + match + "Plugs/";

function isPageArabic()
{
    // Based on your current routing logic:
    if (src.includes("/en/")) return false;
    return true;
}

function initTool()
{
    const body = document.getElementsByTagName("body")[0];
    const head = document.head || document.getElementsByTagName("head")[0];

    // loading the voices
    let _voicesReady = false;
    function ensureVoices(cb)
    {
        if (!window.speechSynthesis) { cb([]); return; }
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) { _voicesReady = true; cb(voices); return; }
        window.speechSynthesis.onvoiceschanged = () =>
        {
            _voicesReady = true;
            window.speechSynthesis.onvoiceschanged = null;
            cb(window.speechSynthesis.getVoices());
        };
        // Fallback: if voiceschanged never fires (Firefox), proceed after 500ms
        setTimeout(() => { if (!_voicesReady) { _voicesReady = true; cb(window.speechSynthesis ? window.speechSynthesis.getVoices() : []); } }, 500);
    }
    ensureVoices(() => { });

    // Prevent double-injection
    if (document.getElementById("daem-accessibility-widget")) return;

    const IS_AR = isPageArabic();
    document.documentElement.lang = IS_AR ? "ar" : "en";
    //document.documentElement.dir = IS_AR ? "rtl" : "ltr";

    // i18n
    const I18N = IS_AR
        ? {
            dir: "rtl",
            openMenuAria: "فتح قائمة الإتاحة الرقمية",
            closeMenuAria: "إغلاق القائمة",
            resetTitle: "إعادة تعيين الكل",
            title: "الإتاحة الرقمية من داعم",
            profiles: "إعدادات مسبقة للإختيار",
            logo: `${ASSETS_BASE}daem_assets/ar_daem.png`,
            signHeader: "مترجم لغة الإشارة",
            signClose: "إغلاق فيديو لغة الإشارة",
            signNote: "(رابط الفيديو مزود من الخلفية)",
            profilesLabels: {
                motor: "إعاقة حركية",
                visual: "إعاقة بصرية",
                colorblind: "عمى ألوان",
                dyslexia: "عسر القراءة",
                lowvision: "ضعف البصر",
                cognitive: "التعلم المعرفي",
                seizure: "الصرع والنوبات",
                adhd: "فرط الحركة",
            },
            featureLabels: {
                "sign-vid": "فيديو لغة الإشارة",
                "sign-font": "خط لغة الإشارة",
                "text-speech": "تحويل النص المحدد إلى كلام",
                "speech-text": "تحويل الكلام إلى نص",
                contrast: "تباين عالٍ للألوان",
                "font-size": "حجم الخط",
                cursor: "مؤشر كبير",
                "line-height": "ارتفاع السطر",
                spacing: "تباعد الأحرف",
                readable: "خط مقروء",
                links: "تحديد الروابط",
                titles: "تحديد العناوين",
                hint: "تلميحات",
                "stop-anim": "إيقاف الحركة",
                "dyslexic-font": "خط عسر القراءة",
                mask: "قناع القراءة",
                "hide-images": "إخفاء الصور",
                "bold-text": "نص غامق",
                "text-align": "محاذاة النص",
                saturation: "التشبع",
                "dark-mode": "الوضع المظلم",
            },
            dynamic: {
                listening: "جاري الاستماع...",
                readSelection: "قراءة المحدد",
                textToSpeech: "تحويل النص المحدد إلى كلام",
                speechToText: "تحويل الكلام إلى نص",
                slFont: "خط لغة الإشارة",
                slFontFull: "خط الإشارة (كامل)",
                slFontSelect: "خط الإشارة (تحديد)",
                contrast: "تباين عالٍ للألوان",
                highContrast: "تباين عالٍ",
                desaturate: "إزالة الألوان",
                readingMask: "قناع القراءة",
                readingLine: "خط القراءة",
                textAlign: "محاذاة النص",
                alignLeft: "محاذاة لليسار",
                alignCenter: "محاذاة للوسط",
                alignRight: "محاذاة لليمين",
                signVideo: "فيديو لغة الإشارة",
                hint: "تلميحات / أدوات مساعدة",

                // STT Modal
                sttTitle: "تحدث إلى نص",
                sttHelp: "تحدث الآن…",
                sttStop: "إيقاف",
                sttResume: "استكمال",
                sttClear: "مسح",
                sttCopy: "نسخ",
                sttCopied: "تم النسخ!",
                sttClose: "إغلاق",
                sttStopped: "تم الإيقاف.",
                sttNoMatch: "لم يتم التعرف على الكلام.",
                sttError: "حدث خطأ.",
            },
            hintPrefixes: {
                title: "العنوان",
                alt: "وصف الصورة",
                placeholder: "نص الحقل",
                link: "رابط",
                button: "زر",
            },
            alerts: {
                sttUnsupported:
                    "المتصفح لا يدعم تحويل الكلام إلى نص. جرّب Chrome أو Edge.",
                ttsUnsupported: "متصفحك لا يدعم تحويل النص إلى كلام.",
                micError: "تعذر الوصول إلى الميكروفون.",
            },
        }
        : {
            dir: "ltr",
            openMenuAria: "Open Accessibility Menu",
            closeMenuAria: "Close Menu",
            resetTitle: "Reset All",
            title: "Daem Accessibility",
            profiles: "Accessibility Profiles",
            logo: `${ASSETS_BASE}daem_assets/en_daem.png`,
            signHeader: "Sign Language Interpreter",
            signClose: "Close Sign Language Video",
            signNote: "(Video URL supplied by backend)",
            profilesLabels: {
                motor: "Motor Impairment",
                visual: "Visual Impairment",
                colorblind: "Color Blind",
                dyslexia: "Dyslexia Friendly",
                lowvision: "Low Vision",
                cognitive: "Cognitive Learning",
                seizure: "Seizure / Epileptic",
                adhd: "ADHD",
            },
            featureLabels: {
                "sign-vid": "Sign Language Video",
                "sign-font": "Sign Language Font",
                "text-speech": "Selected Text to Speech",
                "speech-text": "Speech to Text",
                contrast: "High Color Contrast",
                "font-size": "Font Size",
                cursor: "Large Cursor",
                "line-height": "Line Height",
                spacing: "Character Spacing",
                readable: "Readable Font",
                links: "Highlight Links",
                titles: "Highlight Titles",
                hint: "Hint / Tooltips",
                "stop-anim": "Stop Animation",
                "dyslexic-font": "Dyslexic Font",
                mask: "Reading Mask",
                "hide-images": "Hide Images",
                "bold-text": "Bold Text",
                "text-align": "Text Alignment",
                saturation: "Saturation",
                "dark-mode": "Dark Mode",
            },
            dynamic: {
                listening: "Listening...",
                readSelection: "Read Selection",
                textToSpeech: "Text to Speech (Select)",
                speechToText: "Speech to Text",
                slFont: "Sign Language Font",
                slFontFull: "SL Font Full",
                slFontSelect: "SL Font Select",
                contrast: "High Color Contrast",
                highContrast: "High Contrast",
                desaturate: "Desaturate",
                readingMask: "Reading Mask",
                readingLine: "Reading Line",
                textAlign: "Text Alignment",
                alignLeft: "Align Left",
                alignCenter: "Align Center",
                alignRight: "Align Right",
                signVideo: "Sign Language Video",
                hint: "Hint / Tooltips",

                // STT Modal
                sttTitle: "Speech to Text",
                sttHelp: "Speak now…",
                sttStop: "Stop",
                sttResume: "Resume",
                sttClear: "Clear",
                sttCopy: "Copy",
                sttCopied: "Copied!",
                sttClose: "Close",
                sttStopped: "Stopped.",
                sttNoMatch: "Speech could not be recognized.",
                sttError: "An error occurred.",
            },
            hintPrefixes: {
                title: "Title",
                alt: "Image Alt Text",
                placeholder: "Placeholder",
                link: "Link",
                button: "Button",
            },
            alerts: {
                sttUnsupported:
                    "Speech recognition is not supported in this browser. Try Chrome or Edge.",
                ttsUnsupported: "Your browser does not support Text to Speech.",
                micError: "Could not access microphone.",
            },
        };

    /* --------------------------- 1) SVG icons (no external Font Awesome dependency) --------------------------- */
    const SVG_ICONS = ASSETS_BASE + "daem_assets/SVG_Icons/";

    /* --------------------------- 2) Inject widget DOM (NO iframe) --------------------------- */
    const profileShortcuts = {
        motor: "K",
        visual: "Y",
        colorblind: "J",
        dyslexia: "X",
        lowvision: "W",
        cognitive: "N",
        seizure: "E",
        adhd: "Z",
    };

    // Maps each profile to the features it activates and their expected levels
    const profileFeatureMap = {
        motor: [{ id: "speech-text", level: 1 }],
        visual: [{ id: "text-speech", level: 1 }],
        colorblind: [{ id: "saturation", level: 3 }],
        dyslexia: [{ id: "dyslexic-font", level: 1 }],
        lowvision: [{ id: "saturation", level: 3 }, { id: "font-size", level: 2 }, { id: "cursor", level: 1 }],
        cognitive: [{ id: "saturation", level: 2 }, { id: "font-size", level: 2 }, { id: "mask", level: 2 }],
        seizure: [{ id: "contrast", level: 1 }, { id: "saturation", level: 4 }],
        adhd: [{ id: "mask", level: 1 }, { id: "saturation", level: 1 }],
    };

    const widgetWrapper = document.createElement("div");
    widgetWrapper.id = "daem-accessibility-widget";
    widgetWrapper.setAttribute("dir", I18N.dir);
    if (IS_AR) widgetWrapper.classList.add("daem-acc-ar");

    widgetWrapper.innerHTML = `
    <div id="daem-acc-filter-overlay"></div>

    <button id="daem-access-trigger" class="${IconclassName}" aria-label="${I18N.openMenuAria}" type="button">
      <img src="${SVG_ICONS}daem_mainicon.svg" class="daem-btn-icon" alt="">
    </button>

    <div id="daem-access-panel" aria-hidden="true">
      <div class="daem-access-header" id="acc-drag-handle">
        <h3>${I18N.title}</h3>
        <div class="daem-access-actions">
          <div class="daem-btn-wrap">
            <button id="daem-access-reset" title="${I18N.resetTitle}" type="button">
              <img src="${SVG_ICONS}daem_reset.svg" class="daem-btn-icon" alt="">
            </button>
            <span class="daem-shortcut-hint">Alt+R</span>
          </div>
          <div class="daem-btn-wrap">
            <button id="daem-access-close" aria-label="${I18N.closeMenuAria}" type="button">
              <img src="${SVG_ICONS}daem_close.svg" class="daem-btn-icon" alt="">
            </button>
            <span class="daem-shortcut-hint">Alt+O</span>
          </div>
        </div>
      </div>

      <div class="daem-profiles-accordion">
        <div class="daem-profiles-header" id="profiles-toggle" role="button" tabindex="0">
          <span>${I18N.profiles}</span>
          <span class="daem-chevron">&#9660;</span>
        </div>

        <div class="daem-profiles-content" id="daem-profiles-content">
          <div class="daem-profiles-grid">
            <button class="daem-profile-btn" data-profile="motor" type="button">
              <div class="daem-shortcut-badge">Alt+${profileShortcuts.motor}</div>
              <img src="${SVG_ICONS}daem_profile_motor.svg" class="daem-btn-icon" alt="">
              ${I18N.profilesLabels.motor}
            </button>

            <button class="daem-profile-btn" data-profile="visual" type="button">
              <div class="daem-shortcut-badge">Alt+${profileShortcuts.visual}</div>
              <img src="${SVG_ICONS}daem_profile_blind.svg" class="daem-btn-icon" alt="">
              ${I18N.profilesLabels.visual}
            </button>

            <button class="daem-profile-btn" data-profile="colorblind" type="button">
              <div class="daem-shortcut-badge">Alt+${profileShortcuts.colorblind}</div>
              <img src="${SVG_ICONS}daem_profile_colorblind.svg" class="daem-btn-icon" alt="">
              ${I18N.profilesLabels.colorblind}
            </button>

            <button class="daem-profile-btn" data-profile="dyslexia" type="button">
              <div class="daem-shortcut-badge">Alt+${profileShortcuts.dyslexia}</div>
              <img src="${SVG_ICONS}daem_profile_dyslexia.svg" class="daem-btn-icon" alt="">
              ${I18N.profilesLabels.dyslexia}
            </button>

            <button class="daem-profile-btn" data-profile="lowvision" type="button">
              <div class="daem-shortcut-badge">Alt+${profileShortcuts.lowvision}</div>
              <img src="${SVG_ICONS}daem_profile_lowvision.svg" class="daem-btn-icon" alt="">
              ${I18N.profilesLabels.lowvision}
            </button>

            <button class="daem-profile-btn" data-profile="cognitive" type="button">
              <div class="daem-shortcut-badge">Alt+${profileShortcuts.cognitive}</div>
              <img src="${SVG_ICONS}daem_profile_cognitive.svg" class="daem-btn-icon" alt="">
              ${I18N.profilesLabels.cognitive}
            </button>

            <button class="daem-profile-btn" data-profile="seizure" type="button">
              <div class="daem-shortcut-badge">Alt+${profileShortcuts.seizure}</div>
              <img src="${SVG_ICONS}daem_profile_epilepsy.svg" class="daem-btn-icon" alt="">
              ${I18N.profilesLabels.seizure}
            </button>

            <button class="daem-profile-btn" data-profile="adhd" type="button">
              <div class="daem-shortcut-badge">Alt+${profileShortcuts.adhd}</div>
              <img src="${SVG_ICONS}daem_profile_adhd.svg" class="daem-btn-icon" alt="">
              ${I18N.profilesLabels.adhd}
            </button>
          </div>
        </div>
      </div>

      <div class="daem-access-grid"></div>

      <div class="daem-access-footer">
        <img src="${I18N.logo}" alt="Daem Logo" style="max-height: 50px;">
      </div>
    </div>

    <div id="daem-reading-mask"></div>
    <div id="daem-reading-line"></div>

    <div id="daem-sign-lang-modal">
      <div class="daem-sign-header">
        <span><img src="${SVG_ICONS}daem_signlanguagevideo.svg" class="daem-btn-icon" alt=""> ${I18N.signHeader}</span>
        <button class="daem-sign-close" aria-label="${I18N.signClose}" type="button">
          <img src="${SVG_ICONS}daem_close.svg" class="daem-btn-icon" alt="">
        </button>
      </div>

      <div class="daem-sign-video-content">
        <iframe
          id="daem-sign-lang-iframe"
          src=""
          title="Sign Language Interpreter Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>

      </div>
    </div>

    <!-- Speech-to-Text Popup (NO iframe) -->
    <div id="daem-stt-modal" aria-hidden="true">
      <div class="daem-stt-card" role="dialog" aria-modal="true" aria-labelledby="daem-stt-title">
        <div class="daem-stt-header">
          <div id="daem-stt-title" class="daem-stt-title">${I18N.dynamic.sttTitle}</div>
          <button id="daem-stt-close" class="daem-stt-close" type="button" aria-label="${I18N.dynamic.sttClose}">✕</button>
        </div>

        <div class="daem-stt-body">
          <div id="daem-stt-help" class="daem-stt-help">${I18N.dynamic.sttHelp}</div>
          <textarea
            id="daem-stt-text"
            class="daem-stt-text"
            rows="6"           
          ></textarea>
           

          <div class="daem-stt-actions">
            <button id="daem-stt-copy" class="daem-stt-btn" type="button">
              <span>${I18N.dynamic.sttCopy}</span>
            </button>

            <button id="daem-stt-clear" class="daem-stt-btn" type="button">
              <span>${I18N.dynamic.sttClear}</span>
            </button>

            <button id="daem-stt-stop" class="daem-stt-btn" type="button">
              <span>${I18N.dynamic.sttStop}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      id="daem-hint-tooltip"
      style="position:fixed;display:none;background:#fffcc2;border:1px solid #f9e29a;padding:5px 8px;border-radius:4px;font-size:12px;pointer-events:none;z-index:10004;max-width:300px;"
    ></div>
  `;

    /* --------------------------- 3) Inject CSS (existing + RTL patches + STT modal) --------------------------- */
    const styleElement = document.createElement("style");

    styleElement.innerHTML = `
  /* ========== Your Host Floating Button ========== */
  .the-btn{
    position: fixed;
    background-color: #12cd6a;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    text-align: center;
    display: inline-block;
    line-height: 35px !important;
    z-index: 100000000;
    background-color: #e53935;
    border: 4px solid #efefef;
    padding: 0;
  }
  .Top_Left {left: 25px;top: 20px;}
  .Top_Right {right: 25px;top: 20px;}
  .Top_Center {left: 49%;top: 20px;}
  .Middle_Left {left: 25px;top: 50%;}
  .Middle_Right {right: 25px;top: 50%;}
  .Bottom_Right {right: 25px;bottom: 20px;}
  .Bottom_Center {left: 49%;bottom: 20px;}
  .Bottom_Left {left: 25px;bottom: 20px;}
  .the-btn img{width: 35px;height: auto;}

  /* SVG icon sizes per context */
  #daem-access-trigger .daem-btn-icon { width: 32px; height: 32px; object-fit: contain; }
  .daem-access-header button .daem-btn-icon { width: 16px; height: 16px; object-fit: contain; filter: brightness(0) invert(1); }
  .daem-profiles-header .daem-btn-icon { width: 16px; height: 16px; object-fit: contain; }
  .daem-profile-btn .daem-btn-icon { width: 28px; height: 28px; object-fit: contain; margin-bottom: 5px; }
  .daem-access-btn .daem-btn-icon { width: 32px; height: 32px; object-fit: contain; margin-bottom: 12px; }
  .daem-sign-header .daem-btn-icon { width: 18px; height: 18px; object-fit: contain; vertical-align: middle; }
  .daem-sign-close .daem-btn-icon { width: 14px; height: 14px; object-fit: contain; filter: brightness(0) invert(1); }

  /* ========== Widget Variables ========== */
  :root{
    --daem-acc-primary: #2563eb;
    --daem-acc-bg: #ffffff;
    --daem-acc-text: #1f2937;
    --daem-acc-active-bg: #eff6ff;
    --daem-acc-active-border: #3b82f6;
    --daem-reading-mask-height: 100px;
  }

  /* Custom Fonts */
  @font-face {
    font-family: 'AmericanSignLanguage';
    src: url('${ASSETS_BASE}daem_assets/AmericanSignLanguage.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'ArabicSignLanguage';
    src: url('${ASSETS_BASE}daem_assets/ARFONTS-MANISSI-ABJAD-ISHARA.TTF') format('truetype');
    font-weight: normal;
    font-style: normal;
    unicode-range: U+0600-06FF, U+0750-077F, U+FB50-FDFF, U+FE70-FEFF;
  }
  @font-face {
    font-family: 'OpenDyslexic';
    src: url('${ASSETS_BASE}daem_assets/OpenDyslexic-Bold.woff2') format('woff2');
    font-weight: bold;
    font-style: normal;
  }

  /* Filter overlay */
  #daem-acc-filter-overlay{
    position: fixed;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    pointer-events:none;
    z-index:9998;
    display:none;
  }
  body.daem-acc-contrast-1 #daem-acc-filter-overlay { display:block; backdrop-filter: contrast(150%); -webkit-backdrop-filter: contrast(150%); }
  body.daem-acc-saturation-1 #daem-acc-filter-overlay { display:block; backdrop-filter: saturate(150%); -webkit-backdrop-filter: saturate(150%); }
  body.daem-acc-saturation-2 #daem-acc-filter-overlay { display:block; backdrop-filter: saturate(200%); -webkit-backdrop-filter: saturate(200%); }
  body.daem-acc-saturation-3 #daem-acc-filter-overlay { display:block; backdrop-filter: saturate(300%); -webkit-backdrop-filter: saturate(300%); }
  body.daem-acc-saturation-4 #daem-acc-filter-overlay { display:block; backdrop-filter: grayscale(100%); -webkit-backdrop-filter: grayscale(100%); }

  body.daem-acc-contrast-1{
    background-color:#000 !important;
    color:#fff !important;
  }
  body.daem-acc-contrast-1 *:not(#daem-accessibility-widget, #daem-accessibility-widget *){
    background-color:#000 !important;
    color:#fff !important;
    border-color:#fff !important;
  }

  /* Dark mode */
  body.daem-acc-dark-mode {
    color-scheme: dark;
  }
  body.daem-acc-dark-mode,
  body.daem-acc-dark-mode *:not(
    #daem-accessibility-widget, #daem-accessibility-widget *,
    img, svg, canvas, video, picture, source, iframe
  ) {
    background-color: #121212 !important;
    color: #e2e2e2 !important;
    border-color: #3a3a3a !important;
  }
  body.daem-acc-dark-mode *:not(#daem-accessibility-widget, #daem-accessibility-widget *)::before,
  body.daem-acc-dark-mode *:not(#daem-accessibility-widget, #daem-accessibility-widget *)::after {
    color: #e2e2e2 !important;
  }
  /* Elements with CSS background-image: keep original bg-color so image stays visible */
  body.daem-acc-dark-mode *:not(#daem-accessibility-widget, #daem-accessibility-widget *).daem-has-bg-image {
    background-color: initial !important;
  }
  body.daem-acc-dark-mode *:not(#daem-accessibility-widget, #daem-accessibility-widget *).daem-has-bg-image::before,
  body.daem-acc-dark-mode *:not(#daem-accessibility-widget, #daem-accessibility-widget *).daem-has-bg-image::after {
    background-color: initial !important;
  }
  /* Also cover dynamically-added children of bg-image elements (e.g. slick-dots added after JS scan) */
  body.daem-acc-dark-mode .daem-has-bg-image *:not(#daem-accessibility-widget, #daem-accessibility-widget *) {
    background-color: initial !important;
  }
  body.daem-acc-dark-mode .daem-has-bg-image *:not(#daem-accessibility-widget, #daem-accessibility-widget *)::before,
  body.daem-acc-dark-mode .daem-has-bg-image *:not(#daem-accessibility-widget, #daem-accessibility-widget *)::after {
    background-color: initial !important;
  }
  body.daem-acc-dark-mode a:not(#daem-accessibility-widget a) {
    color: #7eb8f7 !important;
  }
  body.daem-acc-dark-mode img:not(#daem-accessibility-widget img),
  body.daem-acc-dark-mode video:not(#daem-accessibility-widget video),
  body.daem-acc-dark-mode svg:not(#daem-accessibility-widget svg) {
    filter: brightness(0.85) contrast(1.05) !important;
    background-color: transparent !important;
  }

  /* Widget container */
 #daem-accessibility-widget {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    z-index: 99999999999 !important;
    filter: none !important;
    position: relative !important;
    display: block;
}

  /* Widget trigger (internal) */
  #daem-access-trigger{
    position: fixed;
    bottom: 20px;
    left: 20px;
    right: auto;
    width: 60px;
    height: 60px;
    /*background: var(--daem-acc-primary);*/
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 28px;
    cursor: pointer;
    z-index: 10000;
    background-color: #e53935;
    border: 4px solid #efefef
  }

  /* Panel (default LTR slide from left) */
  #daem-access-panel{
    position: fixed;
    top: 0;
    left: -400px;
    right: auto;
    width: 380px;
    height: 100vh;
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 10px 0 30px rgba(0,0,0,0.15);
    transition: left 0.4s;
    display: flex;
    flex-direction: column;
    z-index: 10001;
    overflow-y: auto;
  }
  #daem-access-panel.daem-is-open{ left: 0; right: auto; }

  /* Header */
.daem-access-header{
  padding: 12px 20px;        /* ✅ مسافة أعلى/أسفل أوضح */
  min-height: 52px;          /* ✅ ارتفاع ثابت قريب من التصميم */
  max-height: none;          /* ✅ الغِ التقييد اللي بيضغط الهيدر */
  cursor: grab;
  display: flex;
  align-items: center;       /* ✅ توسيط رأسي حقيقي */
  justify-content: space-between;
  background: #fff;
}

/* Title */
.daem-access-header h3{
  margin: 0 !important;
  font-size: 17px !important;
  font-weight: bold !important;
  line-height: 1.2;          /* ✅ يمنع تقطيع/ضغط */
}

/* Actions wrapper */
.daem-access-actions{
  display: flex;
  align-items: flex-end;
  gap: 8px;                  /* ✅ بدل اللعب في margins */
}
.daem-btn-wrap{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.daem-shortcut-hint{
  font-size: 9px;
  color: #aaa;
  line-height: 1;
  white-space: nowrap;
  user-select: none;
  letter-spacing: 0.3px;
}

/* Buttons */

  .daem-access-header button{
    font-size: 14px;
    background-color: var(--daem-acc-primary);
    color: white !important;
    border: none;
    border-radius: 5px;
    padding: 8px 10px;
    line-height: 1;
    cursor: pointer;
    margin-left: 5px;
    box-shadow: none !important;
  }

  /* Profiles accordion */
  .daem-profiles-accordion{ border-bottom: 1px solid rgba(0,0,0,0.1); background:#fff; }
  .daem-profiles-header{
    padding: 15px 20px;
    cursor: pointer;
    font-weight: 600;
    color: var(--daem-acc-primary);
    display:flex;
    justify-content:space-between;
    align-items:center;
    background:#f8fafc;
  }
  .daem-profiles-header:hover{ background:#f1f5f9; }
  .daem-profiles-content{ display:none; padding: 15px 20px; background:#fff; }
  .daem-profiles-content.daem-active{ display:block; }
  .daem-profiles-grid{ display:grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .daem-profile-btn {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 10px;
    font-size: 13px;
    cursor: pointer;
    text-align: center;
    color: var(--daem-acc-text) !important;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60px;
    box-shadow: none !important;
    position: relative;
}
  .daem-profile-btn:hover{ background:#f9fafb; border-color:#d1d5db; }
  .daem-profile-btn.daem-active{
    background: var(--daem-acc-active-bg);
    border: 2px solid var(--daem-acc-active-border);
    color: var(--daem-acc-primary);
    font-weight: bold;
  }
  .daem-profile-btn i{ margin-bottom: 5px; font-size: 18px; }

  /* Feature grid */
  .daem-access-grid{
    display:grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    padding: 25px;
    flex-grow: 1;
  }
  .daem-access-btn{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    background:white;
    border:1px solid rgba(0,0,0,0.05);
    border-radius:16px;
    padding:15px 10px;
    cursor:pointer;
    position:relative;
    height:110px;
    color: var(--daem-acc-text);
    text-align:center;
    font-size: 14px !important;
    font-weight: 400 !important;
  }
  .daem-access-btn.daem-active{
    background: var(--daem-acc-active-bg);
    border:2px solid var(--daem-acc-active-border);
    color:#1d4ed8;
  }
  .daem-access-btn i{
    font-size:28px;
    margin-bottom:12px;
    color: var(--daem-acc-text);
  }
  .daem-access-btn.daem-active i{ color: var(--daem-acc-primary); }

  .daem-level-badge{
    position:absolute;
    top: 5px;
    left: 5px;
    width: 20px;
    height: 20px;
    background-color: var(--daem-acc-primary);
    color: white;
    border-radius: 50%;
    font-size: 11px;
    font-weight: bold;
    display:none;
    justify-content:center;
    align-items:center;
  }
  .daem-access-btn.daem-active .daem-level-badge[data-level]:not([data-level="1"]){ display:flex; }

  .daem-shortcut-badge{
    position:absolute;
    top:5px;
    right:5px;
    font-size: 10px;
    opacity: 0.7;
  }

  /* Recording pulse */
  @keyframes daem-pulse-red {
    0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
    100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
  }
  .daem-access-btn.daem-recording-active{
    border-color:#ef4444 !important;
    color:#ef4444 !important;
    animation: daem-pulse-red 2s infinite;
  }
  .daem-access-btn.daem-recording-active i{ color:#ef4444 !important; }

  /* TTS speaking pulse (green) */
  @keyframes daem-pulse-green {
    0%   { box-shadow: 0 0 0 0   rgba(16, 185, 129, 0.8); }
    70%  { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);  }
    100% { box-shadow: 0 0 0 0   rgba(16, 185, 129, 0);   }
  }
  .daem-access-btn.daem-tts-speaking {
    border-color: #10b981 !important;
    color: #10b981 !important;
    animation: daem-pulse-green 1s infinite !important;
  }
  .daem-access-btn.daem-tts-speaking .daem-btn-icon { filter: none !important; }

  /* Footer */
  .daem-access-footer{
    height: 50px;
    min-height: 50px;
    background:#fff;
    display:flex;
    justify-content:center;
    align-items:center;
    padding: 5px 0;
    border-top: 1px solid #d1d5db;
    flex-shrink: 0;
    position: sticky;
    bottom: 0;
  }
  .daem-access-footer img{ max-height:100%; max-width:90%; object-fit:contain; }

  /* Cursor */
  body.daem-acc-cursor *{
    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path d="M4,3 L4,37 L13,28 L19,43 L25,40 L19,25 L32,25 Z" fill="white" stroke="black" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/></svg>') 4 3, auto !important;
  }
  body.daem-acc-cursor #daem-accessibility-widget button,
  body.daem-acc-cursor #daem-accessibility-widget [role="button"],
  body.daem-acc-cursor #daem-accessibility-widget [tabindex] {
    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path d="M4,3 L4,37 L13,28 L19,43 L25,40 L19,25 L32,25 Z" fill="white" stroke="black" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/></svg>') 4 3, auto !important;
    pointer-events: auto !important;
  }

  /* Sign language modal */
  #daem-sign-lang-modal{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 680px;
    max-width: 90vw;
    /* height: 550px */
    background: rgba(0,0,0,0.9);
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.5);
    z-index: 10005;
    display:none;
    flex-direction:column;
    overflow:hidden;
  }
  #daem-sign-lang-modal.daem-active{ display:flex; }
  #daem-sign-lang-modal .daem-sign-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding: 10px 15px;
    background: var(--daem-acc-primary);
    color:white;
    flex-shrink: 0;
  }
  #daem-sign-lang-modal .daem-sign-header span i{ margin-right:8px; }
  #daem-sign-lang-modal .daem-sign-close{
    background:none;
    border:none;
    color:white;
    font-size:20px;
    cursor:pointer;
  }
  /* Sign language video container */
#daem-sign-lang-modal .daem-sign-video-content {
  flex-grow: 1;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Iframe itself */
#daem-sign-lang-iframe {
  aspect-ratio: 16 / 9;
  width: 100%;
  height: auto;
  max-height: 100%;
}


  /* الأهم */
  object-fit: contain;   /* يمنع القص */
  background: black;
}


  /* Reading mask/line */
  #daem-reading-mask{
  display:none;
  position: fixed;
  inset: 0;
  z-index: 9998;
  pointer-events:none;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.75) 0%,
    rgba(0,0,0,0.75) var(--rm-top, 40%),
    rgba(0,0,0,0)     var(--rm-top, 40%),
    rgba(0,0,0,0)     var(--rm-bottom, 60%),
    rgba(0,0,0,0.75)  var(--rm-bottom, 60%),
    rgba(0,0,0,0.75)  100%
  );
}
body.daem-acc-mask-1 #daem-reading-mask{ display:block; }

  #daem-reading-mask.daem-moving{
    mask-image: linear-gradient(to bottom, black 0%, transparent 0%, transparent var(--daem-reading-mask-height), black var(--daem-reading-mask-height));
    -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 0%, transparent var(--daem-reading-mask-height), black var(--daem-reading-mask-height));
  }

  #daem-reading-mask{
  display:none;
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  z-index: 9998;
  background: rgba(0,0,0,0.7);
  pointer-events:none;
}
body.daem-acc-mask-1 #daem-reading-mask{ display:block; }
#daem-reading-mask.daem-moving{
  mask-image: linear-gradient(...);
  -webkit-mask-image: linear-gradient(...);
}


  #daem-reading-line{
    display:none;
    position: fixed;
    width: 30%;
    height: 5px;
    background-color: yellow;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
    pointer-events:none;
    z-index: 9999;
    transform: translate(-50%, -50%);
  }
  #daem-reading-line::after{
  content:"";
  position:absolute;
  left:50%;
  top:-10px; /* فوق الخط */
  transform:translateX(-50%);
  width:0;
  height:0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid yellow;  /* نفس لون الخط */
  filter: drop-shadow(0 1px 0 #000); /* حد بسيط */
}
  body.daem-acc-mask-2 #daem-reading-line{ display:block; }

  /* Effects */

  /* Default (English/Latin) */
  body.daem-acc-sign-font-1 *:not(
    #daem-accessibility-widget, #daem-accessibility-widget *,
    #daem-sign-lang-modal, #daem-sign-lang-modal *,
    i, i[class*="fa-"], [class*=" fa-"],
    .material-icons,
    [class*="icon-"], [class*="-icon"]
  ) {
    font-family: 'AmericanSignLanguage', sans-serif !important;
  }
  /* Arabic override */
  body.daem-acc-sign-font-1 *:lang(ar):not(
    #daem-accessibility-widget, #daem-accessibility-widget *,
    #daem-sign-lang-modal, #daem-sign-lang-modal *,
    i, i[class*="fa-"], [class*=" fa-"],
    .material-icons,
    [class*="icon-"], [class*="-icon"]
  ) {
    font-family: 'ArabicSignLanguage', sans-serif !important;
  }

  /* highlight */
  span.daem-acc-sl-highlight {
    font-size: inherit !important;
    background-color: yellow !important;
    color: black !important;
    padding: 2px 0;
    display: inline;
  }
  span.daem-acc-sl-highlight:lang(ar) { font-family: 'ArabicSignLanguage', sans-serif !important; }
  span.daem-acc-sl-highlight:not(:lang(ar)) { font-family: 'AmericanSignLanguage', sans-serif !important; }

  /* font-size levels handled via JS inline scaling (applyFontSizeJS) */

  body.daem-acc-lineheight-1 *:not(#daem-accessibility-widget, #daem-accessibility-widget *) { line-height: 1.75 !important; }
  body.daem-acc-lineheight-2 *:not(#daem-accessibility-widget, #daem-accessibility-widget *) { line-height: 2 !important; }
  body.daem-acc-lineheight-3 *:not(#daem-accessibility-widget, #daem-accessibility-widget *) { line-height: 2.25 !important; }
  body.daem-acc-lineheight-4 *:not(#daem-accessibility-widget, #daem-accessibility-widget *) { line-height: 2.5 !important; }

  body.daem-acc-spacing-1 *:not(#daem-accessibility-widget, #daem-accessibility-widget *) { letter-spacing: 1px !important; word-spacing: 2px !important; }
  body.daem-acc-spacing-2 *:not(#daem-accessibility-widget, #daem-accessibility-widget *) { letter-spacing: 2px !important; word-spacing: 4px !important; }
  body.daem-acc-spacing-3 *:not(#daem-accessibility-widget, #daem-accessibility-widget *) { letter-spacing: 3px !important; word-spacing: 6px !important; }
  body.daem-acc-spacing-4 *:not(#daem-accessibility-widget, #daem-accessibility-widget *) { letter-spacing: 4px !important; word-spacing: 8px !important; }

  body.daem-acc-links a:not(#daem-accessibility-widget a){
    text-decoration: underline !important;
    text-decoration-color: #f59e0b !important;
    text-decoration-thickness: 2px !important;
    text-underline-offset: 3px !important;
  }
  body.daem-acc-links a:not(#daem-accessibility-widget a):not(:has(img)):not(:has(svg)):not(:has([class*="icon"])):not(:has(picture)) {
    box-shadow: 0 0 0 2px #f59e0b !important;
    border-radius: 3px !important;
  }

  body.daem-acc-titles h1:not(#daem-accessibility-widget *),
  body.daem-acc-titles h2:not(#daem-accessibility-widget *),
  body.daem-acc-titles h3:not(#daem-accessibility-widget *),
  body.daem-acc-titles h4:not(#daem-accessibility-widget *),
  body.daem-acc-titles h5:not(#daem-accessibility-widget *),
  body.daem-acc-titles h6:not(#daem-accessibility-widget *){
    border: 2px solid var(--daem-acc-primary) !important;
    padding: 5px !important;
  }

  body.daem-acc-dyslexic-font *:not(
    #daem-accessibility-widget,
    #daem-accessibility-widget *,
    i, i[class*="fa-"], [class*=" fa-"],
    .material-icons,
    [class*="icon-"], [class*="-icon"]
  ) {
    font-family: 'OpenDyslexic', sans-serif !important;
    font-size: inherit !important;
    font-weight: normal !important;
  }
  body.daem-acc-font *:not(
    #daem-accessibility-widget, #daem-accessibility-widget *,
    i, i[class*="fa-"], [class*=" fa-"],
    .material-icons,
    [class*="icon-"], [class*="-icon"]
  ) { font-family: Arial, sans-serif !important; }

  body.daem-acc-stop-anim *:not(#daem-accessibility-widget, #daem-accessibility-widget *),
  body.daem-acc-stop-anim *:not(#daem-accessibility-widget, #daem-accessibility-widget *):before,
  body.daem-acc-stop-anim *:not(#daem-accessibility-widget, #daem-accessibility-widget *):after{
    animation:none !important;
    transition:none !important;
  }

  body.daem-acc-hide-images img:not(#daem-accessibility-widget img){ display:none !important; }

  body.daem-acc-bold-1 *:not(#daem-accessibility-widget, #daem-accessibility-widget *) { font-weight: 700 !important; }
  body.daem-acc-bold-2 *:not(#daem-accessibility-widget, #daem-accessibility-widget *) { font-weight: 900 !important; }

  body.daem-acc-align-left *:not(#daem-accessibility-widget *) { text-align:left !important; }
  body.daem-acc-align-center *:not(#daem-accessibility-widget *) { text-align:center !important; }
  body.daem-acc-align-right *:not(#daem-accessibility-widget *) { text-align:right !important; }

  /* ===== RTL patches (Arabic) ===== */
  #daem-accessibility-widget.daem-acc-ar #daem-access-trigger{ left: auto; right: 20px; }
  #daem-accessibility-widget.daem-acc-ar #daem-access-panel{
    left: auto;
    right: -400px;
    transition: right 0.4s;
    box-shadow: -10px 0 30px rgba(0,0,0,0.15);
  }
  #daem-accessibility-widget.daem-acc-ar #daem-access-panel.daem-is-open{ right: 0; left: auto; }
  #daem-accessibility-widget.daem-acc-ar .daem-shortcut-badge{ right: auto; left: 5px; }
  #daem-accessibility-widget.daem-acc-ar .daem-level-badge{ left: auto; right: 5px; }

  /* ===== Speech-to-Text Modal ===== */
  #daem-stt-modal{
    position: fixed;
    inset: 0;
    display: none;
    z-index: 10006;
    background: rgba(0,0,0,0.55);
    align-items: center;
    justify-content: center;
    padding: 14px;
  }
  #daem-stt-modal.daem-active{ display:flex; }
  #daem-stt-modal .daem-stt-card{
    width: 560px;
    max-width: 95vw;
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 16px 40px rgba(0,0,0,0.25);
    overflow: hidden;
  }
  #daem-stt-modal .daem-stt-header{
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding: 12px 14px;
    background: var(--daem-acc-primary);
    color: #fff;
  }
  #daem-stt-modal .daem-stt-title{ font-weight: 700; }
  #daem-stt-modal .daem-stt-close{
    background: transparent;
    border: none;
    color: #fff !important;
    font-size: 18px;
    cursor: pointer;
    box-shadow: none !important;
    width: auto !important;
  }
  #daem-stt-modal .daem-stt-body{ padding: 14px; }
  #daem-stt-modal .daem-stt-help{
    font-size: 13px;
    opacity: 0.85;
    margin-bottom: 8px;
  }
  #daem-stt-modal .daem-stt-text{
    width: 100% !important;
    box-sizing: border-box;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 10px;
    resize: vertical;
    font-size: 14px;
    outline: none;
    box-shadow: none !important;
    background: #fff !important;
    max-width: 100% !important;
    min-width: 100% !important;
  }
  #daem-stt-modal .daem-stt-actions{
    display:flex;
    gap: 10px;
    margin-top: 10px;
    justify-content: flex-end;
  }
  #daem-stt-modal .daem-stt-btn{
    border: none;
    border-radius: 10px;
    padding: 10px 12px;
    cursor: pointer;
    background: #f3f4f6 !important;

    display: inline-flex;
    align-items: center;
    gap: 8px;
    box-shadow: none !important;
    color: #343a40 !important;
  }
  #daem-stt-modal .daem-stt-btn i{ font-size: 14px; }
  #daem-stt-modal .daem-stt-btn:hover{ background:#e5e7eb; }

  #daem-accessibility-widget.daem-acc-ar #daem-stt-modal .daem-stt-card,
  #daem-accessibility-widget.daem-acc-ar #daem-stt-modal { direction: rtl; }
  `;

    /* --------------------------- 4) Inject scripts you already had --------------------------- */
    const scriptElement = document.createElement("script");
    scriptElement.src = plugHostingUrl2020 + scriptApplayChanges;

    // Using native browser APIs for TTS & STT
    // const scriptElementsdk = document.createElement("script");
    // scriptElementsdk.src = scriptElementsdkURL;

    /* --------------------------- 5) Append everything --------------------------- */
    body.appendChild(styleElement);
    body.appendChild(widgetWrapper);
    body.appendChild(scriptElement);
    // body.appendChild(scriptElementsdk);

    // Patch window.onmessage after applyChange.js loads so that messages
    // with unknown keys don't throw an uncaught TypeError (infinite console error).
    scriptElement.addEventListener('load', function ()
    {
        var _orig = window.onmessage;
        if (typeof _orig === 'function')
        {
            window.onmessage = function (mes)
            {
                try
                {
                    _orig.call(this, mes);
                } catch (e)
                {
                    // Suppress: excuteChnaged[mes.data] is not a function
                    // Fires when the page sends postMessages unrelated to this widget.
                }
            };
        }
    });

    /* --------------------------- 6) Widget behavior (JS) --------------------------- */
    const panel = document.getElementById("daem-access-panel");
    const accessTrigger = document.getElementById("daem-access-trigger");
    const accessClose = document.getElementById("daem-access-close");
    const accessReset = document.getElementById("daem-access-reset");
    const container = document.querySelector("#daem-access-panel .daem-access-grid");
    const readingMask = document.getElementById("daem-reading-mask");
    const readingLine = document.getElementById("daem-reading-line");
    const hintTooltip = document.getElementById("daem-hint-tooltip");
    const signLangModal = document.getElementById("daem-sign-lang-modal");
    const signLangIframe = document.getElementById("daem-sign-lang-iframe");

    // STT Modal elements
    const sttModal = document.getElementById("daem-stt-modal");
    const sttTitle = document.getElementById("daem-stt-title");
    const sttHelp = document.getElementById("daem-stt-help");
    const sttText = document.getElementById("daem-stt-text");
    const sttClose = document.getElementById("daem-stt-close");
    const sttStop = document.getElementById("daem-stt-stop");
    const sttClear = document.getElementById("daem-stt-clear");
    const sttCopy = document.getElementById("daem-stt-copy");

    const SIGN_VIDEO_URL = youTubeVideoLink; // provided by backend

    // Feature definitions (localized labels)
    const features = [
        {
            id: "sign-vid",
            label: I18N.featureLabels["sign-vid"],
            icon: `${SVG_ICONS}daem_signlanguagevideo.svg`,
            key: "1",
        },
        {
            id: "sign-font",
            label: I18N.featureLabels["sign-font"],
            icon: `${SVG_ICONS}daem_signlanguagefont.svg`,
            key: "2",
        },
        {
            id: "text-speech",
            label: I18N.featureLabels["text-speech"],
            icon: `${SVG_ICONS}daem_tts.svg`,
            key: "3",
        },
        {
            id: "speech-text",
            label: I18N.featureLabels["speech-text"],
            icon: `${SVG_ICONS}daem_stt.svg`,
            key: "4",
        },
        {
            id: "dark-mode",
            label: I18N.featureLabels["dark-mode"],
            icon: `${SVG_ICONS}daem_darkmode.svg`,
            key: "C",
        },
        {
            id: "font-size",
            label: I18N.featureLabels["font-size"],
            icon: `${SVG_ICONS}daem_fontsize.svg`,
            key: "F",
        },
        {
            id: "cursor",
            label: I18N.featureLabels.cursor,
            icon: `${SVG_ICONS}daem_mouse.svg`,
            key: "M",
        },
        {
            id: "line-height",
            label: I18N.featureLabels["line-height"],
            icon: `${SVG_ICONS}daem_linehight.svg`,
            key: "L",
        },
        {
            id: "spacing",
            label: I18N.featureLabels.spacing,
            icon: `${SVG_ICONS}daem_fontsize.svg`,
            key: "S",
        },
        {
            id: "readable",
            label: I18N.featureLabels.readable,
            icon: `${SVG_ICONS}daem_readablefont.svg`,
            key: "R",
        },
        { id: "links", label: I18N.featureLabels.links, icon: `${SVG_ICONS}daem_linkhighlight.svg`, key: "H" },
        {
            id: "titles",
            label: I18N.featureLabels.titles,
            icon: `${SVG_ICONS}daem_heading.svg`,
            key: "T",
        },
        {
            id: "hint",
            label: I18N.featureLabels.hint,
            icon: `${SVG_ICONS}daem_hint.svg`,
            key: "Q",
        },
        {
            id: "stop-anim",
            label: I18N.featureLabels["stop-anim"],
            icon: `${SVG_ICONS}daem_stopanimation.svg`,
            key: "P",
        },
        {
            id: "dyslexic-font",
            label: I18N.featureLabels["dyslexic-font"],
            icon: `${SVG_ICONS}daem_dyslexia.svg`,
            key: "D",
        },
        {
            id: "mask",
            label: I18N.featureLabels.mask,
            icon: `${SVG_ICONS}daem_readingmask.svg`,
            key: "V",
        },
        {
            id: "hide-images",
            label: I18N.featureLabels["hide-images"],
            icon: `${SVG_ICONS}daem_hideimages.svg`,
            key: "I",
        },
        {
            id: "bold-text",
            label: I18N.featureLabels["bold-text"],
            icon: `${SVG_ICONS}daem_bold.svg`,
            key: "B",
        },
        {
            id: "text-align",
            label: I18N.featureLabels["text-align"],
            icon: `${SVG_ICONS}daem_align.svg`,
            key: "G",
        },
        {
            id: "saturation",
            label: I18N.featureLabels.saturation,
            icon: `${SVG_ICONS}daem_saturation.svg`,
            key: "U",
        },
    ];

    // Build feature buttons
    features.forEach((feat) =>
    {
        const btn = document.createElement("div");
        btn.className = "daem-access-btn";
        btn.setAttribute("data-id", feat.id);
        btn.setAttribute("role", "button");
        btn.setAttribute("aria-pressed", "false");
        btn.innerHTML = `
      <div class="daem-shortcut-badge">Alt+${feat.key}</div>
      <div class="daem-level-badge"></div>
      <img src="${feat.icon}" class="daem-btn-icon" alt="">
      <span>${feat.label}</span>
    `;
        btn.addEventListener("click", () => toggleFeature(feat.id, btn));
        container.appendChild(btn);
    });

    //// Remove TTS/STT features and related profiles if AllowPageReaderVoiceToText is disabled
    //if (AllowPageReaderVoiceToText === "false" || AllowPageReaderVoiceToText === "False" || AllowPageReaderVoiceToText === "0" || AllowPageReaderVoiceToText === "")
    //{
    //    // Remove TTS and STT feature buttons
    //    const ttsBtn = container.querySelector('[data-id="text-speech"]');
    //    const sttBtn = container.querySelector('[data-id="speech-text"]');
    //    if (ttsBtn) ttsBtn.remove();
    //    if (sttBtn) sttBtn.remove();

    //    // Remove visual (uses TTS) and motor (uses STT) profile buttons
    //    const visualProfile = widgetWrapper.querySelector('[data-profile="visual"]');
    //    const motorProfile = widgetWrapper.querySelector('[data-profile="motor"]');
    //    if (visualProfile) visualProfile.remove();
    //    if (motorProfile) motorProfile.remove();
    //}

    // Draggable panel
    makePanelDraggable(panel, document.getElementById("acc-drag-handle"));

    function makePanelDraggable(draggableElement, handle)
    {
        let isDragging = false;
        let startX;
        let initialOffset;
        const PANEL_WIDTH = 380;

        function getCurrentOffset()
        {
            if (IS_AR)
            {
                const styleRight = draggableElement.style.right;
                return styleRight && styleRight !== "0px" ? parseFloat(styleRight) : 0;
            }
            const styleLeft = draggableElement.style.left;
            return styleLeft && styleLeft !== "0px" ? parseFloat(styleLeft) : 0;
        }

        function setOffset(val)
        {
            if (IS_AR) draggableElement.style.right = `${val}px`;
            else draggableElement.style.left = `${val}px`;
        }

        function onStart(e)
        {
            if (!draggableElement.classList.contains("daem-is-open")) return;
            if (e.button !== 0 && !e.touches) return;
            isDragging = true;
            document.body.style.userSelect = "none";
            initialOffset = getCurrentOffset();
            draggableElement.style.transition = "none";
            startX = e.clientX || (e.touches && e.touches[0].clientX);
        }

        function onMove(e)
        {
            if (!isDragging) return;
            e.preventDefault();
            const currentX = e.clientX || (e.touches && e.touches[0].clientX);
            const dx = currentX - startX;
            let newOffset = IS_AR ? initialOffset - dx : initialOffset + dx;
            const maxOffset = Math.max(0, window.innerWidth - PANEL_WIDTH);
            const minOffset = 0;
            newOffset = Math.min(newOffset, maxOffset);
            newOffset = Math.max(newOffset, minOffset);
            setOffset(newOffset);
            draggableElement.classList.add("daem-is-open");
        }

        function onEnd()
        {
            if (!isDragging) return;
            isDragging = false;
            document.body.style.userSelect = "";
            if (IS_AR) draggableElement.style.transition = "right 0.4s";
            else draggableElement.style.transition = "left 0.4s";
            const finalOffset = getCurrentOffset();
            const maxOffset = Math.max(0, window.innerWidth - PANEL_WIDTH);
            if (finalOffset < 0) setOffset(0);
            else if (finalOffset > maxOffset) setOffset(maxOffset);
            draggableElement.classList.add("daem-is-open");
        }

        handle.addEventListener("mousedown", onStart);
        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onEnd);

        handle.addEventListener("touchstart", (e) => onStart(e), {
            passive: false,
        });
        document.addEventListener("touchmove", (e) => onMove(e), {
            passive: false,
        });
        document.addEventListener("touchend", onEnd);
    }

    // State
    let fontSizeLevel = 0;
    let fontSizeOriginals = null; // Map<Element, {inline, computed}> captured on first activation
    let contrastLevel = 0;
    let lineHeightLevel = 0;
    let charSpacingLevel = 0;
    let textToSpeechLevel = 0;
    let signFontLevel = 0;
    let readingMaskLevel = 0;
    let boldLevel = 0;
    let textAlignLevel = 0;
    let saturationLevel = 0;

    let isHintModeActive = false;

    // Profile state: tracks active presets
    let activeProfiles = new Set();
    let profileActivating = false; // suppresses sync checks during profile activation

    let ttsSynth = null;    // no longer used
    let ttsPlayer = null;   // holds current SpeechSynthesisUtterance — MUST keep reference to prevent Chrome GC bug
    let _ttsKeepAlive = null; // interval id for Chrome 15s resume workaround
    let ttsIsSpeaking = false;

    // ---------- Speech-to-Text (native Web Speech API) state ----------
    let sttController = null; // { stop(), close() ... }
    let sttFinalText = "";
    let sttRecognizer = null;
    let sttIsRunning = false;
    let sttTargetElement = null;
    let _sttStartFn = null;    // stored restart function for resume button

    // Helper: editable field
    function getActiveEditableElement()
    {
        const el = document.activeElement;
        if (!el) return null;
        const tag = (el.tagName || "").toUpperCase();
        if (tag === "INPUT" || tag === "TEXTAREA") return el;
        if (el.isContentEditable) return el;
        return null;
    }

    function writeTextToElement(el, value)
    {
        if (!el) return;
        const tag = (el.tagName || "").toUpperCase();
        if (tag === "INPUT" || tag === "TEXTAREA")
        {
            el.value = value;
            el.dispatchEvent(new Event("input", { bubbles: true }));
            el.dispatchEvent(new Event("change", { bubbles: true }));
            return;
        }
        if (el.isContentEditable)
        {
            el.innerText = value;
            el.dispatchEvent(new Event("input", { bubbles: true }));
        }
    }

    function setSttBoth(value)
    {
        sttText.value = value;
        writeTextToElement(sttTargetElement, value);
    }

    function setStopButtonUI(isRunning)
    {
        const text = sttStop.querySelector("span");
        if (isRunning)
        {
            if (text) text.innerText = I18N.dynamic.sttStop;
        } else
        {
            if (text) text.innerText = I18N.dynamic.sttResume;
        }
    }

    async function copySttText()
    {
        const value = (sttText.value || "").trim();
        if (!value) return;

        try
        {
            await navigator.clipboard.writeText(value);
        } catch (e)
        {
            // Fallback
            sttText.focus();
            sttText.select();
            document.execCommand("copy");
            sttText.setSelectionRange(0, 0);
        }

        const labelSpan = sttCopy.querySelector("span");
        const old = labelSpan ? labelSpan.innerText : "";
        if (labelSpan) labelSpan.innerText = I18N.dynamic.sttCopied || "Copied!";
        setTimeout(() =>
        {
            if (labelSpan) labelSpan.innerText = I18N.dynamic.sttCopy || old;
        }, 900);
    }

    function openSttModal()
    {
        sttTitle.textContent = I18N.dynamic.sttTitle;
        sttHelp.textContent = I18N.dynamic.sttHelp;

        const clearSpan = sttClear.querySelector("span");
        const copySpan = sttCopy.querySelector("span");
        if (clearSpan) clearSpan.innerText = I18N.dynamic.sttClear;
        if (copySpan) copySpan.innerText = I18N.dynamic.sttCopy;

        sttClose.setAttribute("aria-label", I18N.dynamic.sttClose);
        setStopButtonUI(sttIsRunning);

        // Use inline style as well as class — some host-page CSS may override
        // the class-based display rule.
        sttModal.style.display = 'flex';
        sttModal.classList.add("daem-active");
        sttModal.setAttribute("aria-hidden", "false");
    }

    function closeSttModal()
    {
        sttModal.style.display = '';
        sttModal.classList.remove("daem-active");
        sttModal.setAttribute("aria-hidden", "true");
    }

    // Close on overlay click
    sttModal.addEventListener("click", (e) =>
    {
        if (e.target === sttModal)
        {
            stopSpeechToText(true);
        }
    });

    sttClose.addEventListener("click", () => stopSpeechToText(true));
    sttCopy.addEventListener("click", copySttText);

    sttClear.addEventListener("click", () =>
    {
        sttFinalText = "";
        setSttBoth("");
    });

    // Stop/Resume toggle
    sttStop.addEventListener("click", () =>
    {
        if (sttIsRunning)
        {
            // --- Pause ---
            sttIsRunning = false;
            _sttStartFn = true;
            if (sttRecognizer)
            {
                const old = sttRecognizer;
                sttRecognizer = null;
                try { old.abort(); } catch (e) { }
            }
            sttHelp.textContent = I18N.dynamic.sttStopped;
            setStopButtonUI(false);
        }
        else
        {
            // --- Resume ---
            if (!_sttStartFn) return; // no active session to resume
            sttIsRunning = true;
            sttHelp.textContent = I18N.dynamic.sttHelp;
            setStopButtonUI(true);
            speakToText();
            //_sttStartFn();
        }
    });

    /**
     * speakToText (integrated)
     * - Opens popup
     * - Starts continuous recognition using native Web Speech API
     * - Writes into popup + active field
     */
    // Write text into the STT textarea, handling all cases:
    // 1) Direct assignment (works in plain HTML)
    // 2) Native prototype setter (bypasses React/Vue/Angular interceptors)
    // 3) Scroll to bottom so latest text is always visible
    function _setSttDisplay(text)
    {
        if (!sttText) return;
        // Set value directly — no bubbling events so the host page cannot
        // intercept and reset this textarea.
        sttText.value = text;
        // Fallback: native prototype setter for frameworks that override .value
        try
        {
            Object.getOwnPropertyDescriptor(
                window.HTMLTextAreaElement.prototype, 'value'
            ).set.call(sttText, text);
        } catch (_) { }
        // Scroll to newest content
        sttText.scrollTop = sttText.scrollHeight;
        // Only propagate to the original target field (if one was focused at STT start)
        if (sttTargetElement) writeTextToElement(sttTargetElement, text);
    }

    function speakToText()
    {

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        console.log('[STT] speakToText. API=', !!SpeechRecognition);
        if (!SpeechRecognition)
        {
            alert(I18N.alerts.sttUnsupported);
            return null;
        }

        // Capture any currently focused editable field
        sttTargetElement = getActiveEditableElement();

        // Reset state & UI
        if (!sttIsRunning)
        {
            sttFinalText = "";
        }
        sttHelp.textContent = I18N.dynamic.sttHelp;
        _setSttDisplay(sttFinalText);
        openSttModal();

        // Cleanly destroy any previous recognizer
        const old = sttRecognizer;
        sttRecognizer = null;
        sttIsRunning = false;
        _sttStartFn = null;
        if (old) { try { old.abort(); } catch (_) { } }

        let _noSpeechStreak = 0; // tracks consecutive no-speech events

        // startRec: create a fresh SpeechRecognition instance and start it.
        // Each round uses a NEW instance because Chrome's implementation does
        // not reliably support calling .start() on an already-ended instance.
        function startRec()
        {
            if (!sttIsRunning) return;

            const rec = new SpeechRecognition();
            sttRecognizer = rec;

            // --- Config ---
            rec.lang = IS_AR ? "ar-SA" : "en-US";
            // continuous:false = one recognition round per instance (most reliable)
            rec.continuous = false;
            // interimResults:true = live preview while speaking
            rec.interimResults = true;
            rec.maxAlternatives = 1;

            // --- Handlers ---
            rec.onstart = () =>
            {
                console.log('[STT] onstart lang=', rec.lang);
                sttHelp.textContent = I18N.dynamic.sttHelp;
            };

            rec.onresult = (e) =>
            {
                // If the modal was accidentally closed while recognition is active, reopen it
                if (sttIsRunning && sttModal.style.display !== 'flex')
                    openSttModal();

                // Case A: continuous:false → e.results always has exactly 1 item per call.
                // Case B: in some browsers e.results may accumulate → loop from 0 for safety.
                // We collect interim separately so the textarea shows live preview.
                let interim = "";
                let roundFinal = "";

                for (let i = 0; i < e.results.length; i++)
                {
                    const t = (e.results[i][0].transcript || "").trim();
                    if (!t) continue; // skip empty tokens
                    if (e.results[i].isFinal)
                        roundFinal += (roundFinal ? " " : "") + t;
                    else
                        interim += (interim ? " " : "") + t;
                }

                console.log('[STT] onresult final=' + JSON.stringify(roundFinal) + ' interim=' + JSON.stringify(interim));

                // Append confirmed text to the session accumulator
                if (roundFinal)
                {
                    sttFinalText = sttFinalText
                        ? sttFinalText + " " + roundFinal
                        : roundFinal;
                    _noSpeechStreak = 0;
                }

                // Display: confirmed text + live interim preview
                const display = interim
                    ? sttFinalText + (sttFinalText ? " " : "") + interim
                    : sttFinalText;

                if (display) _setSttDisplay(display);
            };

            rec.onerror = (e) =>
            {
                console.error('[STT] onerror:', e.error);

                // Non-fatal — onend will restart
                if (e.error === "aborted") return;
                if (e.error === "no-speech")
                {
                    _noSpeechStreak++;
                    if (_noSpeechStreak >= 4)
                        sttHelp.textContent = IS_AR
                            ? "لم أسمعك. تحدّث بوضوح باتجاه الميكروفون."
                            : "No speech detected. Speak clearly into the microphone.";
                    return; // onend will restart the round
                }

                // Fatal — stop the session
                sttIsRunning = false;
                sttRecognizer = null;
                _sttStartFn = null;
                setStopButtonUI(false);

                switch (e.error)
                {
                    case "not-allowed":
                    case "service-not-allowed":
                        sttHelp.textContent = IS_AR
                            ? "الميكروفون محظور. اضغط على أيقونة القفل في شريط العنوان وافتح إذن الميكروفون."
                            : "Microphone blocked. Click the lock icon in the address bar and allow microphone.";
                        break;
                    case "network":
                        sttHelp.textContent = IS_AR
                            ? "لا يوجد اتصال بخدمة التعرف على الكلام. تحقق من الإنترنت."
                            : "Cannot reach speech service. Check your internet connection.";
                        break;
                    case "audio-capture":
                        sttHelp.textContent = IS_AR
                            ? "لا يوجد ميكروفون. تحقق من توصيل الجهاز."
                            : "No microphone found. Check device connection.";
                        break;
                    default:
                        sttHelp.textContent = (IS_AR ? "خطأ: " : "Error: ") + e.error;
                }
            };

            rec.onend = () =>
            {
                console.log('[STT] onend. running=', sttIsRunning, 'same=', sttRecognizer === rec);
                // Only restart if this is still the active session
                if (sttIsRunning && sttRecognizer === rec)
                {
                    sttRecognizer = null;
                    // 300ms gap prevents Chrome InvalidStateError on fast re-start
                    setTimeout(startRec, 300);
                }
            };

            try
            {
                rec.start();
                console.log('[STT] start() called. lang=', rec.lang);
            } catch (err)
            {
                console.error('[STT] start() threw:', err);
                // If start() throws, retry once after a longer delay
                sttRecognizer = null;
                if (sttIsRunning)
                    setTimeout(startRec, 800);
                else
                {
                    _sttStartFn = null;
                    sttHelp.textContent = I18N.dynamic.sttError;
                    setStopButtonUI(false);
                }
            }
        }

        _sttStartFn = startRec;
        sttIsRunning = true;
        setStopButtonUI(true);
        startRec();

        return {
            stop: () => stopSpeechToText(false),
            close: () => stopSpeechToText(true),
        };
    }

    function stopSpeechToText(closePopup)
    {
        sttIsRunning = false;
        _sttStartFn = null;

        // Null BEFORE abort so onend won't trigger a restart
        if (sttRecognizer)
        {
            const old = sttRecognizer;
            sttRecognizer = null;
            try { old.abort(); } catch (e) { }
        }

        sttHelp.textContent = I18N.dynamic.sttStopped;
        setStopButtonUI(false);

        // Update widget button UI
        const sttBtn = document.querySelector('.daem-access-btn[data-id="speech-text"]');
        if (sttBtn)
        {
            sttBtn.classList.remove("daem-recording-active", "daem-active");
            const sp = sttBtn.querySelector("span");
            if (sp) sp.innerText = I18N.dynamic.speechToText;
            syncProfileActiveState();
        }

        if (closePopup) closeSttModal();
        sttController = null;
    }

    function toggleSpeechToText(btnElement)
    {
        // If currently active => pause (keep popup open)
        if (btnElement.classList.contains("daem-recording-active"))
        {
            if (sttRecognizer && sttIsRunning)
            {
                sttIsRunning = false;
                try { sttRecognizer.stop(); } catch (e) { }
                sttHelp.textContent = I18N.dynamic.sttStopped;
                setStopButtonUI(false);
            }
            btnElement.classList.remove("daem-recording-active");
            btnElement.querySelector("span").innerText = I18N.dynamic.speechToText;
            return;
        }

        // Start
        sttController = speakToText();
        if (!sttController) return;

        btnElement.classList.add("daem-recording-active", "daem-active");
        btnElement.querySelector("span").innerText = I18N.dynamic.listening;
    }

    function stopNativeTts()
    {
        console.log('[TTS] stopNativeTts called. ttsIsSpeaking=', ttsIsSpeaking);
        ttsIsSpeaking = false;
        ttsPlayer = null;
        if (_ttsKeepAlive) { clearInterval(_ttsKeepAlive); _ttsKeepAlive = null; }
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        const ttsBtn = document.querySelector('.daem-access-btn[data-id="text-speech"]');
        if (ttsBtn) ttsBtn.classList.remove('daem-tts-speaking');
    }

    function speakText(text)
    {
        console.log('[TTS] speakText called. text=', JSON.stringify(text.substring(0, 80)));
        if (!window.speechSynthesis)
        {
            alert(IS_AR ? "المتصفح لا يدعم تحويل النص إلى كلام." : "Browser does not support text-to-speech.");
            return;
        }

        const synth = window.speechSynthesis;
        const ttsBtn = document.querySelector('.daem-access-btn[data-id="text-speech"]');

        function _clearSpeakingUI()
        {
            ttsIsSpeaking = false;
            ttsPlayer = null;
            if (_ttsKeepAlive) { clearInterval(_ttsKeepAlive); _ttsKeepAlive = null; }
            if (ttsBtn) ttsBtn.classList.remove('daem-tts-speaking');
        }

        // Clear any previous keep-alive and cancel queued speech
        if (_ttsKeepAlive) { clearInterval(_ttsKeepAlive); _ttsKeepAlive = null; }
        synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1;
        utterance.pitch = 1;

        // --- Voice selection ---
        const voices = synth.getVoices();
        console.log('[TTS] voices available (' + voices.length + '):', voices.map(v => v.name + '[' + v.lang + ']').join(' | '));

        let matchedVoice = null;
        if (IS_AR)
        {
            // Try multiple Arabic locale codes in order of preference
            matchedVoice =
                voices.find(v => v.lang === 'ar-SA') ||
                voices.find(v => v.lang === 'ar-EG') ||
                voices.find(v => v.lang === 'ar-XA') ||
                voices.find(v => v.lang === 'ar') ||
                voices.find(v => v.lang.toLowerCase().startsWith('ar'));
        }
        else
        {
            matchedVoice =
                voices.find(v => v.lang === 'en-US') ||
                voices.find(v => v.lang.startsWith('en'));
        }

        if (matchedVoice)
        {
            utterance.voice = matchedVoice;
            utterance.lang = matchedVoice.lang; // align lang with the actual voice
            console.log('[TTS] ✔ voice selected:', matchedVoice.name, '[' + matchedVoice.lang + ']');
        }
        else
        {
            // No Arabic voice installed — fall back to first available voice so audio actually plays.
            // Chrome silently fires onstart+onend with no audio when lang='ar-SA' has no matching voice.
            // Setting an explicit available voice guarantees audible output.
            const fallback = voices.find(v => v.lang === 'en-US') || voices[0];
            if (fallback)
            {
                utterance.voice = fallback;
                utterance.lang = fallback.lang;
                console.warn('[TTS] ⚠ no Arabic voice found — falling back to:', fallback.name, '[' + fallback.lang + ']',
                    '| Install Windows Arabic TTS voice (Settings → Time & Language → Speech → Add voices) for proper Arabic speech.');
            }
            else
            {
                utterance.lang = IS_AR ? 'ar-SA' : 'en-US';
                console.warn('[TTS] ⚠ no voices available at all — attempting with lang=', utterance.lang);
            }
        }

        // CRITICAL: keep strong reference to prevent Chrome GC bug (crbug.com/509488)
        ttsPlayer = utterance;
        ttsIsSpeaking = true;
        if (ttsBtn) ttsBtn.classList.add('daem-tts-speaking');

        // Chrome bug: utterances >~15s get silently paused — poke resume() periodically
        _ttsKeepAlive = setInterval(() =>
        {
            if (!ttsIsSpeaking) { clearInterval(_ttsKeepAlive); _ttsKeepAlive = null; return; }
            if (synth.paused) { console.log('[TTS] keep-alive: resuming'); synth.resume(); }
        }, 5000);

        utterance.onstart = () => { console.log('[TTS] ✓ onstart'); };
        utterance.onend = () => { console.log('[TTS] ✓ onend'); _clearSpeakingUI(); };
        utterance.onerror = (e) => { console.error('[TTS] ✗ onerror:', e.error); _clearSpeakingUI(); };
        utterance.onpause = () => { console.warn('[TTS] paused'); };
        utterance.onresume = () => { console.log('[TTS] resumed'); };

        if (synth.paused) synth.resume();
        console.log('[TTS] calling synth.speak()...');
        synth.speak(utterance);
        console.log('[TTS] after speak(): speaking=', synth.speaking, 'pending=', synth.pending);
    }

    // Open/close panel
    function togglePanel()
    {
        const isOpen = panel.classList.toggle("daem-is-open");
        accessTrigger.setAttribute("aria-expanded", String(isOpen));
        panel.setAttribute("aria-hidden", String(!isOpen));

        // Slide behavior differs for RTL
        if (IS_AR)
        {
            panel.style.transition = "right 0.4s";
            panel.style.right = isOpen ? "0px" : "-400px";
            panel.style.left = "auto";
        } else
        {
            panel.style.transition = "left 0.4s";
            panel.style.left = isOpen ? "0px" : "-400px";
            panel.style.right = "auto";
        }
    }

    function Open_Tool()
    {
        if (!panel.classList.contains("daem-is-open")) togglePanel();
    }

    accessTrigger.addEventListener("click", togglePanel);

    accessClose.addEventListener("click", () =>
    {
        panel.classList.remove("daem-is-open");
        panel.setAttribute("aria-hidden", "true");
        accessTrigger.setAttribute("aria-expanded", "false");
        if (IS_AR)
        {
            panel.style.transition = "right 0.4s";
            panel.style.right = "-400px";
            panel.style.left = "auto";
        } else
        {
            panel.style.transition = "left 0.4s";
            panel.style.left = "-400px";
            panel.style.right = "auto";
        }
    });

    // Level badge
    function updateLevelBadge(btnElement, level)
    {
        const badge = btnElement.querySelector(".daem-level-badge");
        btnElement.classList.remove("daem-active");

        if (level > 1 || (btnElement.dataset.id === "text-align" && level > 0))
        {
            badge.innerText = String(level);
            badge.setAttribute("data-level", String(level));
            btnElement.classList.add("daem-active");
        } else if (level === 1)
        {
            badge.removeAttribute("data-level");
            badge.innerText = "";
            btnElement.classList.add("daem-active");
        } else
        {
            badge.removeAttribute("data-level");
            badge.innerText = "";
        }
        syncProfileActiveState();
        saveState();
    }

    // Returns the current numeric level for a given feature id
    function getFeatureLevel(id)
    {
        switch (id)
        {
            case "contrast": return contrastLevel;
            case "font-size": return fontSizeLevel;
            case "line-height": return lineHeightLevel;
            case "spacing": return charSpacingLevel;
            case "saturation": return saturationLevel;
            case "dark-mode": return document.body.classList.contains("daem-acc-dark-mode") ? 1 : 0;
            case "sign-font": return signFontLevel;
            case "mask": return readingMaskLevel;
            case "bold-text": return boldLevel;
            case "text-align": return textAlignLevel;
            case "text-speech": return textToSpeechLevel;
            case "cursor": return document.body.classList.contains("daem-acc-cursor") ? 1 : 0;
            case "readable": return document.body.classList.contains("daem-acc-font") ? 1 : 0;
            case "dyslexic-font": return document.body.classList.contains("daem-acc-dyslexic-font") ? 1 : 0;
            case "links": return document.body.classList.contains("daem-acc-links") ? 1 : 0;
            case "titles": return document.body.classList.contains("daem-acc-titles") ? 1 : 0;
            case "stop-anim": return document.body.classList.contains("daem-acc-stop-anim") ? 1 : 0;
            case "hide-images": return document.body.classList.contains("daem-acc-hide-images") ? 1 : 0;
            case "speech-text": {
                const b = document.querySelector('.daem-access-btn[data-id="speech-text"]');
                return (b && b.classList.contains("daem-active")) ? 1 : 0;
            }
            default: return 0;
        }
    }

    // Deselects a profile badge if any of its expected features no longer match
    function syncProfileActiveState()
    {
        if (profileActivating) return;
        document.querySelectorAll(".daem-profile-btn").forEach(btn =>
        {
            const profileType = btn.dataset.profile;
            if (!activeProfiles.has(profileType)) return;
            const expectations = profileFeatureMap[profileType] || [];
            const allMatch = expectations.every(({ id, level }) => getFeatureLevel(id) === level);
            if (!allMatch)
            {
                activeProfiles.delete(profileType);
                btn.classList.remove("daem-active");
            }
        });
    }

    // Scans page elements for CSS background-image and marks them + their descendants to prevent dark-mode bg-color override
    function daemScanBgImages()
    {
        var bgRects = [];

        // Pass 1: find elements with background-image, mark them AND all DOM descendants
        document.querySelectorAll('*').forEach(function (el)
        {
            if (el.closest('#daem-accessibility-widget')) return;
            try
            {
                var cs = window.getComputedStyle(el);
                if (cs.backgroundImage && cs.backgroundImage !== 'none')
                {
                    el.classList.add('daem-has-bg-image');
                    bgRects.push(el.getBoundingClientRect());
                    // Mark all DOM descendants so overlay children are preserved too
                    el.querySelectorAll('*').forEach(function (child)
                    {
                        if (!child.closest('#daem-accessibility-widget'))
                        {
                            child.classList.add('daem-has-bg-image');
                        }
                    });
                }
            } catch (e) { }
        });

        if (bgRects.length === 0) return;

        // Pass 2: find transparent/semi-transparent elements that visually overlap bg-image areas
        // (handles cases where text overlay is a sibling, not a child, of the bg-image element)
        document.querySelectorAll('div, section, article, header, footer, nav, aside, span, figure, [class*="overlay"], [class*="caption"], [class*="content"], [class*="slide"], [class*="hero"], [class*="banner"]').forEach(function (el)
        {
            if (el.closest('#daem-accessibility-widget')) return;
            if (el.classList.contains('daem-has-bg-image')) return;
            try
            {
                var bgColor = window.getComputedStyle(el).backgroundColor;
                var isTransparent = bgColor === 'rgba(0, 0, 0, 0)' ||
                    (bgColor.indexOf('rgba') === 0 && !bgColor.endsWith(', 1)'));
                if (!isTransparent) return;
                var rect = el.getBoundingClientRect();
                var overlaps = bgRects.some(function (bgRect)
                {
                    return rect.right > bgRect.left && rect.left < bgRect.right &&
                        rect.bottom > bgRect.top && rect.top < bgRect.bottom;
                });
                if (overlaps) el.classList.add('daem-has-bg-image');
            } catch (e) { }
        });
    }

    // Drives a feature to an exact target level (0 = off) by cycling via toggleFeature
    function setFeatureToLevel(id, targetLevel)
    {
        // First go to 0
        let safety = 20;
        while (getFeatureLevel(id) !== 0 && safety-- > 0) toggleFeature(id);
        // Then step up to targetLevel
        safety = 20;
        while (getFeatureLevel(id) !== targetLevel && targetLevel > 0 && safety-- > 0) toggleFeature(id);
    }

    // Selection handler (TTS + sign font select)
    function handleSelectionAction()
    {
        if (textToSpeechLevel === 1) readSelection();
        if (signFontLevel === 2) applySignFontToSelection();
    }

    function readSelection()
    {
        const selectedText = window.getSelection().toString().trim();
        console.log('[TTS] readSelection called. selectedText=', JSON.stringify(selectedText.substring(0, 60)));
        if (!selectedText) { console.log('[TTS] readSelection: empty, skipping'); return; }
        speakText(selectedText);
    }

    function applySignFontToSelection()
    {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;
        const selectedText = selection.toString().trim();

        if (selectedText.length === 0)
        {
            removeSignFontHighlight();
            return;
        }

        removeSignFontHighlight();

        const range = selection.getRangeAt(0);
        const commonAncestor = range.commonAncestorContainer;
        const root = commonAncestor.nodeType === Node.TEXT_NODE
            ? commonAncestor.parentNode
            : commonAncestor;

        // Walk every text node within the range and wrap each one individually.
        // This avoids the block-inside-inline invalidity that breaks across headings/links.
        const textNodes = [];
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
        let node;
        while ((node = walker.nextNode()))
        {
            // Skip widget-internal nodes
            if (node.parentElement && node.parentElement.closest("#daem-accessibility-widget")) continue;
            if (range.intersectsNode(node)) textNodes.push(node);
        }

        textNodes.forEach(textNode =>
        {
            const nodeRange = document.createRange();
            if (textNode === range.startContainer && textNode === range.endContainer)
            {
                nodeRange.setStart(textNode, range.startOffset);
                nodeRange.setEnd(textNode, range.endOffset);
            } else if (textNode === range.startContainer)
            {
                nodeRange.setStart(textNode, range.startOffset);
                nodeRange.setEndAfter(textNode);
            } else if (textNode === range.endContainer)
            {
                nodeRange.setStart(textNode, 0);
                nodeRange.setEnd(textNode, range.endOffset);
            } else
            {
                nodeRange.selectNodeContents(textNode);
            }

            if (!nodeRange.toString().trim()) return;

            const wrapper = document.createElement("span");
            wrapper.setAttribute("lang", IS_AR ? "ar" : "en");
            wrapper.setAttribute("dir", IS_AR ? "rtl" : "ltr");
            wrapper.className = "daem-acc-sl-highlight";

            try
            {
                nodeRange.surroundContents(wrapper);
            } catch (e)
            {
                try
                {
                    const frag = nodeRange.extractContents();
                    wrapper.appendChild(frag);
                    nodeRange.insertNode(wrapper);
                } catch (e2) { /* skip malformed node */ }
            }
        });

        selection.removeAllRanges();
    }

    function removeSignFontHighlight()
    {
        document.querySelectorAll("span.daem-acc-sl-highlight").forEach((span) =>
        {
            const parent = span.parentNode;
            while (span.firstChild) parent.insertBefore(span.firstChild, span);
            parent.removeChild(span);
        });
    }

    // Text to speech toggle
    function toggleTextToSpeech(btnElement)
    {
        console.log('[TTS] toggleTextToSpeech called. current textToSpeechLevel=', textToSpeechLevel);
        if (!window.speechSynthesis)
        {
            console.error('[TTS] window.speechSynthesis NOT available!');
            alert(
                IS_AR
                    ? "المتصفح لا يدعم تحويل النص إلى كلام."
                    : "Browser does not support text-to-speech."
            );
            return;
        }

        // Stop any ongoing TTS first
        stopNativeTts();

        // Toggle level (on/off)
        textToSpeechLevel = textToSpeechLevel === 1 ? 0 : 1;

        // Remove previous listeners
        document.removeEventListener("mouseup", handleSelectionAction);
        document.removeEventListener("touchend", handleSelectionAction);
        document.removeEventListener("selectionchange", handleTtsSelectionChange);

        if (textToSpeechLevel === 1)
        {
            // ENABLE TTS: read selection on mouse/touch release
            document.addEventListener("mouseup", handleSelectionAction);
            document.addEventListener("touchend", handleSelectionAction);
            document.addEventListener("selectionchange", handleTtsSelectionChange);
            btnElement.classList.add("daem-active");
            console.log('[TTS] ENABLED. Listening for mouseup/touchend. Voices available:', window.speechSynthesis.getVoices().length);

            // Check if Arabic voice is available; if not, show install banner
            if (IS_AR)
            {
                const voices = window.speechSynthesis.getVoices();
                const hasArabicVoice = voices.some(v => v.lang.toLowerCase().startsWith('ar'));
                if (!hasArabicVoice)
                {
                    alert(
                        'لا يوجد صوت عربي مثبت على هذا الجهاز.\n\n' +
                        'لتفعيل النطق بالعربية:\n' +
                        '1. افتح إعدادات Windows\n' +
                        '2. الوقت واللغة ← الكلام\n' +
                        '3. إدارة الأصوات ← إضافة صوت\n' +
                        '4. ابحث عن "Arabic (Egypt)" وثبّته\n' +
                        '5. أعد تشغيل المتصفح'
                    );
                }
            }

            // UX fix: if text is already selected when TTS is activated, read it immediately
            const existingSel = window.getSelection();
            if (existingSel && !existingSel.isCollapsed)
            {
                const existingText = existingSel.toString().trim();
                console.log('[TTS] existing selection on activate:', JSON.stringify(existingText.substring(0, 60)));
                if (existingText) speakText(existingText);
            }
        } else
        {
            // DISABLE TTS
            btnElement.classList.remove("daem-active");

            // If sign-font selection mode is still active, keep selection handler
            if (signFontLevel === 2)
            {
                document.addEventListener("mouseup", handleSelectionAction);
                document.addEventListener("touchend", handleSelectionAction);
            }
        }

        updateLevelBadge(btnElement, textToSpeechLevel);
    }

    // Stop TTS immediately when the user collapses / clears their selection
    function handleTtsSelectionChange()
    {
        if (textToSpeechLevel !== 1) return;
        // Never cancel while TTS is actively speaking — selectionchange fires right after
        // mouseup triggers speak(), and cancelling here would kill the utterance instantly.
        if (ttsIsSpeaking) return;
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed || sel.toString().trim() === "")
        {
            stopNativeTts();
        }
    }

    // Sign font toggle
    function toggleSignFont(btnElement)
    {
        signFontLevel = (signFontLevel + 1) % 3;

        document.body.classList.remove("daem-acc-sign-font-1");
        document.removeEventListener("mouseup", handleSelectionAction);
        document.removeEventListener("touchend", handleSelectionAction);
        removeSignFontHighlight();

        if (signFontLevel === 1)
        {
            document.body.classList.add("daem-acc-sign-font-1");
            btnElement.querySelector("span").innerText = I18N.dynamic.slFontFull;
        } else if (signFontLevel === 2)
        {
            document.addEventListener("mouseup", handleSelectionAction);
            document.addEventListener("touchend", handleSelectionAction);
            btnElement.querySelector("span").innerText = I18N.dynamic.slFontSelect;
        } else
        {
            btnElement.querySelector("span").innerText = I18N.dynamic.slFont;
        }

        // If TTS is active, ensure handler still exists
        if (textToSpeechLevel === 1 && signFontLevel !== 2)
        {
            document.addEventListener("mouseup", handleSelectionAction);
            document.addEventListener("touchend", handleSelectionAction);
        }

        updateLevelBadge(btnElement, signFontLevel);
    }

    // Sign video modal
    function closeSignLangModal()
    {
        signLangModal.classList.remove("daem-active");
        signLangIframe.src = "";
        const btnElement = document.querySelector(
            '.daem-access-btn[data-id="sign-vid"]'
        );
        if (btnElement) btnElement.classList.remove("daem-active");
    }

    signLangModal
        .querySelector(".daem-sign-close")
        .addEventListener("click", closeSignLangModal);

    function toggleSignLanguage(btnElement)
    {
        const isActive = btnElement.classList.contains("daem-active");
        if (!isActive)
        {
            signLangIframe.src = SIGN_VIDEO_URL || "";
            signLangModal.classList.add("daem-active");
            btnElement.classList.add("daem-active");
        } else
        {
            closeSignLangModal();
        }
    }

    const MASK_HALF = 50; // = 100px total height like your design

    function moveMask(e)
    {
        const mouseY = e.clientY || (e.touches ? e.touches[0].clientY : 0);
        const mouseX = e.clientX || (e.touches ? e.touches[0].clientX : 0);

        if (readingMaskLevel === 1)
        {
            // Clamp in pixels so gradient is ALWAYS valid
            const topPx = Math.max(0, mouseY - MASK_HALF);
            const bottomPx = Math.min(window.innerHeight, mouseY + MASK_HALF);

            const maskStyle =
                `linear-gradient(to bottom,
        rgba(0,0,0,1) 0px,
        rgba(0,0,0,1) ${topPx}px,
        rgba(0,0,0,0) ${topPx}px,
        rgba(0,0,0,0) ${bottomPx}px,
        rgba(0,0,0,1) ${bottomPx}px,
        rgba(0,0,0,1) 100%)`;

            readingMask.style.webkitMaskImage = maskStyle;
            readingMask.style.maskImage = maskStyle;
        } else if (readingMaskLevel === 2)
        {
            readingLine.style.top = `${mouseY}px`;
            readingLine.style.left = `${mouseX}px`;
        }
    }

    function toggleReadingMask(btnElement)
    {
        readingMaskLevel = (readingMaskLevel + 1) % 3;

        document.body.classList.remove("daem-acc-mask-1", "daem-acc-mask-2");

        // مهم: شيل listeners من window (هنستخدم window بدل document)
        window.removeEventListener("mousemove", moveMask);
        window.removeEventListener("touchmove", moveMask);

        let buttonText = I18N.dynamic.readingMask;

        if (readingMaskLevel === 1)
        {
            document.body.classList.add("daem-acc-mask-1");
            readingMask.classList.add("daem-moving");
            document.addEventListener("mousemove", moveMask);
            document.addEventListener("touchmove", moveMask);

            // initialize immediately
            moveMask({ clientY: window.innerHeight / 2 });
        } else if (readingMaskLevel === 2)
        {
            document.body.classList.add("daem-acc-mask-2");

            // ✅ تحديث فوري
            moveMask({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });

            window.addEventListener("mousemove", moveMask);
            window.addEventListener("touchmove", moveMask, { passive: true });

            btnElement.classList.add("daem-active");
            buttonText = I18N.dynamic.readingLine;
        } else
        {
            btnElement.classList.remove("daem-active");
        }

        btnElement.querySelector("span").innerText = buttonText;
        updateLevelBadge(btnElement, readingMaskLevel);
    }


    // Font-size JS scaler (works on any page regardless of px/rem/em usage)
    const FONT_SIZE_SCALES = [1, 1.1, 1.25, 1.45, 1.7];
    function applyFontSizeJS(level)
    {
        if (level === 0)
        {
            if (fontSizeOriginals)
            {
                fontSizeOriginals.forEach((orig, el) =>
                {
                    if (!document.contains(el)) return;
                    if (orig.inline === null) el.style.removeProperty('font-size');
                    else el.style.fontSize = orig.inline;
                });
                fontSizeOriginals = null;
            }
            return;
        }
        const scale = FONT_SIZE_SCALES[level];
        // Capture original computed sizes once
        if (!fontSizeOriginals)
        {
            fontSizeOriginals = new Map();
            document.querySelectorAll(
                '*:not(#daem-accessibility-widget):not(#daem-accessibility-widget *)'
            ).forEach(el =>
            {
                fontSizeOriginals.set(el, {
                    inline: el.style.fontSize || null,
                    computed: parseFloat(window.getComputedStyle(el).fontSize)
                });
            });
        }
        // Apply scale from captured computed values
        fontSizeOriginals.forEach((orig, el) =>
        {
            if (!document.contains(el)) return;
            el.style.setProperty('font-size', (orig.computed * scale) + 'px', 'important');
        });
    }

    // Hint mode
    function getHintText(element)
    {
        if (element.hasAttribute && element.hasAttribute("tab-hint"))
            return element.getAttribute("tab-hint");
        if (element.title) return `${I18N.hintPrefixes.title}: ${element.title}`;
        if (element.alt) return `${I18N.hintPrefixes.alt}: ${element.alt}`;
        if (element.placeholder)
            return `${I18N.hintPrefixes.placeholder}: ${element.placeholder}`;
        if (element.tagName === "A" && element.innerText)
            return `${I18N.hintPrefixes.link}: ${element.innerText}`;
        if (element.tagName === "BUTTON" && element.innerText)
            return `${I18N.hintPrefixes.button}: ${element.innerText}`;
        return null;
    }

    function showHint(e)
    {
        const element = e.target;
        const hintText = getHintText(element);

        if (
            hintText &&
            isHintModeActive &&
            !element.closest("#daem-accessibility-widget")
        )
        {
            hintTooltip.innerText = hintText;
            hintTooltip.style.display = "block";
            const rect = element.getBoundingClientRect();
            hintTooltip.style.left = `${rect.left + window.scrollX + 10}px`;
            hintTooltip.style.top = `${rect.top + 5}px`;
            /*hintTooltip.style.top = `${rect.top + window.scrollY + 5}px`;*/
        }
    }

    function hideHint()
    {
        hintTooltip.style.display = "none";
    }

    function toggleHintMode(btnElement)
    {
        isHintModeActive = !isHintModeActive;

        if (isHintModeActive)
        {
            document.addEventListener("mouseover", showHint);
            document.addEventListener("focusin", showHint);
            document.addEventListener("mouseout", hideHint);
            document.addEventListener("focusout", hideHint);
            btnElement.classList.add("daem-active");
        } else
        {
            document.removeEventListener("mouseover", showHint);
            document.removeEventListener("focusin", showHint);
            document.removeEventListener("mouseout", hideHint);
            document.removeEventListener("focusout", hideHint);
            hideHint();
            btnElement.classList.remove("daem-active");
        }
    }

    // Toggle dispatcher
    function toggleFeature(id, btnElement)
    {
        if (!btnElement)
        {
            btnElement = document.querySelector(`.daem-access-btn[data-id="${id}"]`);
            if (!btnElement) return;
        }

        if (id === "speech-text") return toggleSpeechToText(btnElement);
        if (id === "text-speech") return toggleTextToSpeech(btnElement);
        if (id === "sign-font") return toggleSignFont(btnElement);
        if (id === "sign-vid") return toggleSignLanguage(btnElement);
        if (id === "mask") return toggleReadingMask(btnElement);
        if (id === "hint") return toggleHintMode(btnElement);

        let currentLevel = 0;

        switch (id)
        {
            case "contrast":
                contrastLevel = (contrastLevel + 1) % 2;
                currentLevel = contrastLevel;
                document.body.classList.remove("daem-acc-contrast-1");
                if (contrastLevel === 1) document.body.classList.add("daem-acc-contrast-1");
                break;

            case "line-height":
                lineHeightLevel = (lineHeightLevel + 1) % 5;
                currentLevel = lineHeightLevel;
                document.body.classList.remove(
                    "daem-acc-lineheight-1",
                    "daem-acc-lineheight-2",
                    "daem-acc-lineheight-3",
                    "daem-acc-lineheight-4"
                );
                if (lineHeightLevel > 0)
                    document.body.classList.add(`daem-acc-lineheight-${lineHeightLevel}`);
                break;

            case "font-size":
                fontSizeLevel = (fontSizeLevel + 1) % 5;
                currentLevel = fontSizeLevel;
                applyFontSizeJS(fontSizeLevel);
                break;

            case "spacing":
                charSpacingLevel = (charSpacingLevel + 1) % 5;
                currentLevel = charSpacingLevel;
                document.body.classList.remove(
                    "daem-acc-spacing-1",
                    "daem-acc-spacing-2",
                    "daem-acc-spacing-3",
                    "daem-acc-spacing-4"
                );
                if (charSpacingLevel > 0)
                    document.body.classList.add(`daem-acc-spacing-${charSpacingLevel}`);
                break;

            case "cursor":
                document.body.classList.toggle("daem-acc-cursor");
                currentLevel = document.body.classList.contains("daem-acc-cursor") ? 1 : 0;
                break;

            case "readable":
                document.body.classList.toggle("daem-acc-font");
                currentLevel = document.body.classList.contains("daem-acc-font") ? 1 : 0;
                break;

            case "dyslexic-font":
                document.body.classList.toggle("daem-acc-dyslexic-font");
                currentLevel = document.body.classList.contains("daem-acc-dyslexic-font")
                    ? 1
                    : 0;
                break;

            case "links":
                document.body.classList.toggle("daem-acc-links");
                currentLevel = document.body.classList.contains("daem-acc-links") ? 1 : 0;
                break;

            case "titles":
                document.body.classList.toggle("daem-acc-titles");
                currentLevel = document.body.classList.contains("daem-acc-titles") ? 1 : 0;
                break;

            case "stop-anim":
                document.body.classList.toggle("daem-acc-stop-anim");
                currentLevel = document.body.classList.contains("daem-acc-stop-anim")
                    ? 1
                    : 0;
                break;

            case "hide-images":
                document.body.classList.toggle("daem-acc-hide-images");
                currentLevel = document.body.classList.contains("daem-acc-hide-images")
                    ? 1
                    : 0;
                break;

            case "bold-text":
                boldLevel = (boldLevel + 1) % 2;
                currentLevel = boldLevel;
                document.body.classList.remove("daem-acc-bold-1");
                if (boldLevel > 0) document.body.classList.add(`daem-acc-bold-${boldLevel}`);
                break;

            case "text-align":
                textAlignLevel = (textAlignLevel + 1) % 4;
                currentLevel = textAlignLevel;

                document.body.classList.remove(
                    "daem-acc-align-left",
                    "daem-acc-align-center",
                    "daem-acc-align-right"
                );
                let alignLabel = I18N.dynamic.textAlign;

                if (textAlignLevel === 1)
                {
                    document.body.classList.add("daem-acc-align-left");
                    alignLabel = I18N.dynamic.alignLeft;
                } else if (textAlignLevel === 2)
                {
                    document.body.classList.add("daem-acc-align-center");
                    alignLabel = I18N.dynamic.alignCenter;
                } else if (textAlignLevel === 3)
                {
                    document.body.classList.add("daem-acc-align-right");
                    alignLabel = I18N.dynamic.alignRight;
                }

                btnElement.querySelector("span").innerText = alignLabel;
                break;

            case "saturation":
                saturationLevel = (saturationLevel + 1) % 5;
                currentLevel = saturationLevel;
                document.body.classList.remove(
                    "daem-acc-saturation-1",
                    "daem-acc-saturation-2",
                    "daem-acc-saturation-3",
                    "daem-acc-saturation-4"
                );
                if (saturationLevel > 0)
                    document.body.classList.add(`daem-acc-saturation-${saturationLevel}`);
                btnElement.querySelector("span").innerText =
                    saturationLevel === 4
                        ? I18N.dynamic.desaturate
                        : I18N.featureLabels.saturation;
                break;

            case "dark-mode":
                var turningOn = !document.body.classList.contains("daem-acc-dark-mode");
                if (turningOn)
                {
                    daemScanBgImages(); // scan BEFORE dark mode class is added so original styles are readable
                    document.body.classList.add("daem-acc-dark-mode");
                    currentLevel = 1;
                } else
                {
                    document.body.classList.remove("daem-acc-dark-mode");
                    document.querySelectorAll('.daem-has-bg-image').forEach(el => el.classList.remove('daem-has-bg-image'));
                    currentLevel = 0;
                }
                break;
        }

        updateLevelBadge(btnElement, currentLevel);
    }

    // All CSS classes the widget adds to <body>
    const WIDGET_BODY_CLASSES = [
        "daem-acc-contrast-1",
        "daem-acc-dark-mode",
        "daem-acc-saturation-1", "daem-acc-saturation-2", "daem-acc-saturation-3", "daem-acc-saturation-4",
        "daem-acc-fontsize-1", "daem-acc-fontsize-2", "daem-acc-fontsize-3", "daem-acc-fontsize-4",
        "daem-acc-lineheight-1", "daem-acc-lineheight-2", "daem-acc-lineheight-3", "daem-acc-lineheight-4",
        "daem-acc-spacing-1", "daem-acc-spacing-2", "daem-acc-spacing-3", "daem-acc-spacing-4",
        "daem-acc-cursor",
        "daem-acc-sign-font-1",
        "daem-acc-links",
        "daem-acc-titles",
        "daem-acc-dyslexic-font",
        "daem-acc-font",
        "daem-acc-stop-anim",
        "daem-acc-hide-images",
        "daem-acc-bold-1", "daem-acc-bold-2",
        "daem-acc-align-left", "daem-acc-align-center", "daem-acc-align-right",
        "daem-acc-mask-1", "daem-acc-mask-2",
    ];

    // Reset function
    function resetAll()
    {
        applyFontSizeJS(0); // restore all inline font-size overrides before clearing body classes
        // Remove only the widget's own body classes — leave all site classes untouched
        document.body.classList.remove(...WIDGET_BODY_CLASSES);
        // Do NOT wipe document.body.className or removeAttribute("style")

        fontSizeLevel = 0;
        contrastLevel = 0;
        lineHeightLevel = 0;
        charSpacingLevel = 0;
        textToSpeechLevel = 0;
        signFontLevel = 0;
        readingMaskLevel = 0;
        boldLevel = 0;
        textAlignLevel = 0;
        saturationLevel = 0;

        activeProfiles.clear();

        // Stop STT and close popup on reset
        stopSpeechToText(true);

        document.querySelectorAll(".daem-access-btn").forEach((btn) =>
        {
            btn.classList.remove("daem-active", "daem-recording-active");

            const badge = btn.querySelector(".daem-level-badge");
            if (badge)
            {
                badge.removeAttribute("data-level");
                badge.innerText = "";
            }

            const id = btn.dataset.id;

            // Restore defaults
            if (id && I18N.featureLabels[id])
                btn.querySelector("span").innerText = I18N.featureLabels[id];

            // Special ones that change dynamically
            if (id === "contrast")
                btn.querySelector("span").innerText = I18N.dynamic.contrast;
            if (id === "sign-font")
                btn.querySelector("span").innerText = I18N.dynamic.slFont;
            if (id === "text-speech")
                btn.querySelector("span").innerText = I18N.dynamic.textToSpeech;
            if (id === "speech-text")
                btn.querySelector("span").innerText = I18N.dynamic.speechToText;
            if (id === "mask")
                btn.querySelector("span").innerText = I18N.dynamic.readingMask;
            if (id === "text-align")
                btn.querySelector("span").innerText = I18N.dynamic.textAlign;
            if (id === "sign-vid")
                btn.querySelector("span").innerText = I18N.dynamic.signVideo;
            if (id === "hint")
                btn.querySelector("span").innerText = I18N.dynamic.hint;
        });

        document
            .querySelectorAll(".daem-profile-btn")
            .forEach((pBtn) => pBtn.classList.remove("daem-active"));

        window.speechSynthesis && stopNativeTts();

        document.removeEventListener("mouseup", handleSelectionAction);
        document.removeEventListener("touchend", handleSelectionAction);
        document.removeEventListener("selectionchange", handleTtsSelectionChange);

        removeSignFontHighlight();

        document.body.classList.remove("daem-acc-mask-1", "daem-acc-mask-2");
        //readingMask.classList.remove("moving");
        document.removeEventListener("mousemove", moveMask);
        document.removeEventListener("touchmove", moveMask);

        if (isHintModeActive)
        {
            // Turn off hint mode cleanly
            isHintModeActive = true;
            toggleHintMode(document.querySelector('.daem-access-btn[data-id="hint"]'));
        }

        closeSignLangModal();
        hintTooltip.style.display = "none";
        localStorage.removeItem("daem_widget_state");
    }

    // ---- Persistence helpers ----
    const DAEM_STORAGE_KEY = "daem_widget_state";

    function saveState()
    {
        try
        {
            const state = {
                fontSizeLevel,
                contrastLevel,
                lineHeightLevel,
                charSpacingLevel,
                signFontLevel,
                readingMaskLevel,
                boldLevel,
                textAlignLevel,
                saturationLevel,
                darkMode: document.body.classList.contains("daem-acc-dark-mode"),
                cursor: document.body.classList.contains("daem-acc-cursor"),
                font: document.body.classList.contains("daem-acc-font"),
                dyslexicFont: document.body.classList.contains("daem-acc-dyslexic-font"),
                links: document.body.classList.contains("daem-acc-links"),
                titles: document.body.classList.contains("daem-acc-titles"),
                stopAnim: document.body.classList.contains("daem-acc-stop-anim"),
                hideImages: document.body.classList.contains("daem-acc-hide-images"),
                activeProfiles: [...activeProfiles],
            };
            localStorage.setItem(DAEM_STORAGE_KEY, JSON.stringify(state));
        } catch (e) { /* localStorage unavailable */ }
    }

    function loadState()
    {
        let saved;
        try { saved = JSON.parse(localStorage.getItem(DAEM_STORAGE_KEY)); }
        catch (e) { return; }
        if (!saved) return;

        // Numeric levels — step up via setFeatureToLevel
        const numericFeatures = [
            ["contrast", saved.contrastLevel],
            ["font-size", saved.fontSizeLevel],
            ["line-height", saved.lineHeightLevel],
            ["spacing", saved.charSpacingLevel],
            ["saturation", saved.saturationLevel],
            ["sign-font", saved.signFontLevel],
            ["mask", saved.readingMaskLevel],
            ["bold-text", saved.boldLevel],
            ["text-align", saved.textAlignLevel],
        ];
        numericFeatures.forEach(([id, level]) =>
        {
            if (level && level > 0) setFeatureToLevel(id, level);
        });

        // Boolean toggles
        if (saved.darkMode) { daemScanBgImages(); setFeatureToLevel("dark-mode", 1); }
        if (saved.cursor) setFeatureToLevel("cursor", 1);
        if (saved.font) setFeatureToLevel("readable", 1);
        if (saved.dyslexicFont) setFeatureToLevel("dyslexic-font", 1);
        if (saved.links) setFeatureToLevel("links", 1);
        if (saved.titles) setFeatureToLevel("titles", 1);
        if (saved.stopAnim) setFeatureToLevel("stop-anim", 1);
        if (saved.hideImages) setFeatureToLevel("hide-images", 1);

        // Restore active profile badges (visual only, features already applied above)
        if (Array.isArray(saved.activeProfiles))
        {
            saved.activeProfiles.forEach(profileType =>
            {
                activeProfiles.add(profileType);
                const btn = document.querySelector(`.daem-profile-btn[data-profile="${profileType}"]`);
                if (btn) btn.classList.add("daem-active");
            });
        }
    }

    // Load persisted state once the widget DOM and feature definitions are ready
    loadState();

    accessReset.addEventListener("click", resetAll);

    // Keyboard shortcuts: Alt+A / Alt+O — toggle panel, Alt+R — reset, Alt+<key> — features, Alt+K/Y/J/X/W/N/E/Z — profiles
    document.addEventListener("keydown", (e) =>
    {
        if (e.altKey && e.key && e.key.toUpperCase() === "A")
        {
            e.preventDefault();
            togglePanel();
            return;
        }
        if (e.altKey && e.code === "KeyO")
        {
            e.preventDefault();
            togglePanel();
            return;
        }
        if (e.altKey && e.code === "KeyR")
        {
            e.preventDefault();
            resetAll();
            return;
        }
        if (e.altKey && e.key)
        {
            const key = e.key.toUpperCase();
            // Check profile shortcuts
            const profileEntry = Object.entries(profileShortcuts).find(
                ([, k]) => k === key
            );
            if (profileEntry)
            {
                e.preventDefault();
                const profileBtn = document.querySelector(
                    '.daem-profile-btn[data-profile="' + profileEntry[0] + '"]'
                );
                if (profileBtn) profileBtn.click();
                return;
            }
            // Check feature shortcuts
            const feature = features.find((f) => f.key === key);
            if (feature)
            {
                e.preventDefault();
                toggleFeature(feature.id);
            }
        }
    });

    // Profiles accordion logic
    const profilesToggle = document.getElementById("profiles-toggle");
    const profilesContent = document.getElementById("daem-profiles-content");

    profilesToggle.addEventListener("click", () =>
    {
        profilesContent.classList.toggle("daem-active");
        const chevron = profilesToggle.querySelector(".daem-chevron");
        if (chevron)
        {
            chevron.innerHTML = profilesContent.classList.contains("daem-active")
                ? "&#9650;"
                : "&#9660;";
        }
    });

    // Profiles presets
    const profileBtns = document.querySelectorAll(".daem-profile-btn");

    profileBtns.forEach((btn) =>
    {
        btn.addEventListener("click", () =>
        {
            const profileType = btn.dataset.profile;
            const wasActive = btn.classList.contains("daem-active");

            if (wasActive)
            {
                btn.classList.remove("daem-active");
                activeProfiles.delete(profileType);

                // For each feature this profile activated, set it to the highest level
                // still required by any remaining active profile (or 0 if none need it)
                const features = profileFeatureMap[profileType] || [];
                features.forEach(({ id }) =>
                {
                    const targetLevel = [...activeProfiles].reduce((max, pid) =>
                    {
                        const f = (profileFeatureMap[pid] || []).find(f => f.id === id);
                        return f ? Math.max(max, f.level) : max;
                    }, 0);
                    setFeatureToLevel(id, targetLevel);
                });
                return;
            }

            // Activate this profile on top of any existing state (no resetAll)
            profileActivating = true;
            btn.classList.add("daem-active");
            activeProfiles.add(profileType);

            const setFeature = (id, targetLevel) =>
            {
                for (let i = 0; i < targetLevel; i++) toggleFeature(id);
            };

            switch (profileType)
            {
                case "motor":
                    toggleFeature("speech-text");
                    break;
                case "visual":
                    toggleFeature("text-speech");
                    break;
                case "colorblind":
                    setFeature("saturation", 3);
                    break;
                case "dyslexia":
                    toggleFeature("dyslexic-font");
                    break;
                case "lowvision":
                    setFeature("saturation", 3);
                    setFeature("font-size", 2);
                    toggleFeature("cursor");
                    break;
                case "cognitive":
                    setFeature("saturation", 2);
                    setFeature("font-size", 2);
                    setFeature("mask", 2);
                    break;
                case "seizure":
                    setFeature("contrast", 1);
                    setFeature("saturation", 4);
                    break;
                case "adhd":
                    setFeature("mask", 1);
                    setFeature("saturation", 1);
                    break;
            }

            // Commit active profile — sync checks are now live
            profileActivating = false;
        });
    });
}
if (document.readyState === "complete") initTool();
else
    document.addEventListener("readystatechange", () =>
    {
        if (document.readyState === "complete") initTool();
    });
