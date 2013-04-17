const SUPPORTED_LOCALES = new Array(
  'ach','af', 'ak', 'an', 'ar', 'as', 'ast','be', 'bg', 'bn-BD', 'bn-IN', 'br', 'bs', 'ca', 'cs', 'cy', 'da', 'de', 'el', 'en-GB', 'en-ZA', 'eo', 'es-AR', 'es-CL', 'es-ES', 'es-MX', 'et', 'eu', 'fa', 'ff','fi', 'fr', 'fy-NL', 'ga-IE', 'gl', 'gu-IN', 'he', 'hi-IN', 'hr', 'hu', 'hy-AM', 'id', 'is', 'it', 'ja-JP-mac', 'ja', 'ka', 'kk', 'km' 'kn', 'ko', 'ku', 'lg','lij','lt', 'lv', 'mai','mk', 'ml', 'mn', 'mr', 'ms', 'my','nb-NO', 'ne-NP', 'nl', 'nn-NO', 'nr', 'nso', 'oc', 'or', 'pa-IN', 'pl', 'pt-BR', 'pt-PT', 'rm', 'ro', 'ru', 'rw', 'si', 'sk', 'sl', 'son', 'sq', 'sr', 'ss', 'st', 'sv-SE', 'ta-LK', 'ta', 'te', 'th', 'tn', 'tr', 'ts', 'uk', 've', 'vi', 'wo','xh', 'zh-CN', 'zh-TW', 'zu'
);

window.addEventListener('load', initTranOverlay, false);

function initTranOverlay() {
    var menu = document.getElementById("contentAreaContextMenu");
    menu.addEventListener("popupshowing", contextPopupShowing, false);
}

function contextPopupShowing() {
    var menuitem1 = document.getElementById("context-item-TraMoz1");
    var menuitem2 = document.getElementById("context-item-TraMoz2");

    if (menuitem1) {
      menuitem1.hidden = !gContextMenu.isTextSelected;
    }
     if (menuitem2) {
      menuitem2.hidden = !gContextMenu.isTextSelected;
    }
    
   
}

// -------------------------------Captain Caveman code inside!

function GetOpenTranLocale()
{
    var iIndex, iLen;
    var sShortLocale = "";

    //Get the full locale, e.g. fr-FR
    var sLocale = GetLocale();
    //sLocale = sLocale.toLowerCase();

    //Check if the full locale is supported.
    iLen = SUPPORTED_LOCALES.length;

    for (iIndex = 0; iIndex < iLen; iIndex++) {
        if (sLocale == SUPPORTED_LOCALES[iIndex]) {
            return sLocale;
        }
    }
    //Get the position of the '-' in the locale
    sShortLocale = sLocale;
    var iPos = sShortLocale.indexOf('-');

    //Get only the part before the '-', e.g. fr
    if (iPos > 0) {
        sShortLocale = sShortLocale.substr(0, iPos);
    }

    for (iIndex = 0; iIndex < iLen; iIndex++) {
        if (sShortLocale == SUPPORTED_LOCALES[iIndex]) {
            return sShortLocale;
        }
    }

    return "en-US"; //Default to en...
}

function GetLocale()
{
    //Get the locale from the general.useragent.locale preference, this might be a complex (unicode) value so try that first
    var oPref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("general.useragent.");
    try {
        return oPref.getComplexValue("locale", Components.interfaces.nsIPrefLocalizedString).data;
    } catch (e) {}

    return oPref.getCharPref("locale");
}

// ----------------end of Captain Caveman's code from  QLS extension

function opentranslate(search)
{
    var url = "http://transvision.mozfr.org/?sourcelocale=en-US&locale=" + GetOpenTranLocale() + "&repo=central&search_type=";    
    var focusedWindow = document.commandDispatcher.focusedWindow;

    if (focusedWindow == window) {
       focusedWindow = content;
    }
    
    var myText = focusedWindow.getSelection();
    
    if (search == 'string') {
        var provider = url + "strings&recherche=";
        var searchType = "search string";
    } else {
        var provider = url + "entities&recherche=";
        var searchType = "search entity";
   }

    var finalText = provider.concat(myText);
    var theTab = gBrowser.addTab(finalText);
    theTab.label = "Transvision:" + searchType;
    gBrowser.selectedTab = theTab;
}
