const SUPPORTED_LOCALES = new Array(
	'ach','af', 'ak', 'an', 'ar', 'as', 'ast','be', 'bg', 'bn-BD', 'bn-IN', 'br', 'bs', 'ca', 'cs', 'cy', 'da', 'de', 'el', 'en-GB', 'en-ZA', 'eo', 'es-AR', 'es-CL', 'es-ES', 'es-MX', 'et', 'eu', 'fa', 'ff','fi', 'fr', 'fy-NL', 'ga-IE', 'gd', 'gl', 'gu-IN', 'he', 'hi-IN', 'hr', 'hu', 'hy-AM', 'id', 'is', 'it', 'ja-JP-mac', 'ja', 'ka', 'kk', 'km' ,'kn', 'ko', 'ku', 'lg','lij','lt', 'lv', 'mai','mk', 'ml', 'mr', 'ms', 'my','nb-NO', 'ne-NP', 'nl', 'nn-NO', 'nr', 'nso', 'oc', 'or', 'pa-IN', 'pl', 'pt-BR', 'pt-PT', 'rm', 'ro', 'ru', 'rw', 'si', 'sk', 'sl', 'son', 'sq', 'sr', 'ss', 'st', 'sv-SE', 'ta', 'ta-LK', 'te', 'th', 'tn', 'tr', 'ts', 'uk', 've', 'vi', 'wo','xh', 'zh-CN', 'zh-TW', 'zu'
);

var moztrans = {

	initTranOverlay : function() {
		var menu = document.getElementById("contentAreaContextMenu");
		menu.addEventListener("popupshowing", moztrans.contextPopupShowing, false);
	},

	contextPopupShowing : function() {
		var menupop = document.getElementById("transvision-main");
		if (menupop) {
			menupop.hidden = !gContextMenu.isTextSelected;
		}
	},

	GetOpenTranLocale : function() {
		var iIndex, iLen;
		var sShortLocale = "";
		var sLocale = moztrans.GetLocale();
		iLen = SUPPORTED_LOCALES.length;
		for (iIndex = 0; iIndex < iLen; iIndex++) {
			if (sLocale == SUPPORTED_LOCALES[iIndex]) {
					return sLocale;
			}
		}
		sShortLocale = sLocale;
		var iPos = sShortLocale.indexOf('-');
		if (iPos > 0) {
				sShortLocale = sShortLocale.substr(0, iPos);
		}
		for (iIndex = 0; iIndex < iLen; iIndex++) {
			if (sShortLocale == SUPPORTED_LOCALES[iIndex]) {
					return sShortLocale;
			}
		}
		return "en-US";
	},

	GetLocale : function() {
		var oPref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("general.useragent.");
		try {
				return oPref.getComplexValue("locale", Components.interfaces.nsIPrefLocalizedString).data;
		} catch (e) {}
		return oPref.getCharPref("locale");
	},

	opentranslate : function(search) {
		var url = "http://transvision.mozfr.org/?sourcelocale=en-US&locale=" + moztrans.GetOpenTranLocale() + "&repo=central&search_type=";		
		var focusedWindow = document.commandDispatcher.focusedWindow;
		if (focusedWindow == window) {
			 focusedWindow = content;
		}
		var myText = focusedWindow.getSelection();
		if (search == 'string') {
				var provider = url + "strings&recherche=";
				var searchType = "search string";
		}
		else if (search == 'entities') {
				var provider = url + "entities&recherche=";
				var searchType = "search entities";
		}
		else {
				var provider = url + "strings_entities&recherche=";
				var searchType = "search strings_entities";
		 }
		var finalText = encodeURI(provider.concat(myText));
		var theTab = gBrowser.addTab(finalText);
		theTab.label = "Transvision:" + searchType;
		gBrowser.selectedTab = theTab;
	}
}

window.addEventListener('load', moztrans.initTranOverlay, false);