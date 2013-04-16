const SUPPORTED_LOCALES = new Array("Af","ar","as","be","bg","bn-BD","bn-IN","ca","cs","cy","da","de","el","en-GB","en-ZA","eo","es-AR","es-CL","es-ES","es-MX","et","eu","fa","fi","fr","fy-NL","ga-IE","gl","gu-IN","he","hi-IN","hr","hu","hy-AM","id","is","it","ja-JP-mac","ja","ka","kk","kn","ko","ku","lt","lv","mk","ml","mn","mr","ms","nb-NO","ne-NP","nl","nn-NO","nr","nso","oc","or","pa-IN","pl","pt-BR","pt-PT","rm","ro","ru","rw","si","sk","sl","sq","sr","ss","st","sv-SE","ta-LK","ta","te","th","tn","tr","ts","uk","ve","vi","xh","zh-CN","zh-TW","zu");
window.addEventListener("load", initTranOverlay, false);

function initTranOverlay() {
  var menu = document.getElementById("contentAreaContextMenu");
  menu.addEventListener("popupshowing", contextPopupShowing, false);
}

function contextPopupShowing() {
  var menuitem = document.getElementById("context-item-TraMoz");
  if(menuitem)
    menuitem.hidden= !gContextMenu.isTextSelected;
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
  for (iIndex = 0; iIndex < iLen; iIndex++) if (sLocale == SUPPORTED_LOCALES[iIndex]) return sLocale;
  //Get the position of the '-' in the locale
  sShortLocale = sLocale;
  var iPos = sShortLocale.indexOf('-');
  //Get only the part before the '-', e.g. fr
  if (iPos > 0) sShortLocale = sShortLocale.substr(0, iPos);
  for (iIndex = 0; iIndex < iLen; iIndex++) if (sShortLocale == SUPPORTED_LOCALES[iIndex]) return sShortLocale;
  
  return "en-US"; //Default to en...
}

function GetLocale()
{
  //Get the locale from the general.useragent.locale preference, this might be a complex (unicode) value so try that first
  var oPref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("general.useragent.");
  try {return oPref.getComplexValue("locale", Components.interfaces.nsIPrefLocalizedString).data;}
  catch (e) {}
  return oPref.getCharPref("locale");
}
// ----------------end of Captain Caveman's code from  QLS extension

function opentranslate()
{

  var provider="http://transvision.mozfr.org/?sourcelocale=en-US&locale="+ GetOpenTranLocale()+"&repo=central&search_type=strings&recherche=";
	
	//
	var focusedWindow = document.commandDispatcher.focusedWindow;
  if (focusedWindow == window)
       focusedWindow = content;
  var myText= focusedWindow.getSelection();

  //
  var finalText=provider.concat(myText);
  
  //
	var theTab          = gBrowser.addTab(finalText);
  theTab.label        = "MozTran";
  
  //
  gBrowser.selectedTab = theTab;
  
}
