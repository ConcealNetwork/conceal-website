document.addEventListener("DOMContentLoaded", function(){

  function translate(langData) {
    tkeys = document.querySelectorAll('[data-tkey]');
    Array.prototype.forEach.call(tkeys, function(element, index, array){
      strKey = element.getAttribute('data-tkey');
      if(langData.hasOwnProperty(strKey)) {
        var strTr = langData[strKey];
        element.textContent = strTr;
      }
    });
  } // translate()


  /* 
    Initialize the language keys
  */
  var getEnglishReq = new XMLHttpRequest();
  getEnglishReq.open('GET', 'lang/en.json?v4', true);
  getEnglishReq.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      var enLangData = JSON.parse(this.response);
      var all = document.body.getElementsByTagName("*");
      for (var key of Object.keys(enLangData)) {
        for (var i = 0; i < all.length; i++) {
          if(!all[i].firstElementChild) {
            if (all[i].textContent.trim().toUpperCase() === enLangData[key].toUpperCase()) {
              all[i].setAttribute('data-tkey',key);
              if(!key.includes('wordOnly')) {
                break;
              }
            }
          }
        }
      }
    } else {
      // We reached our target server, but it returned an error
    }
  };
  getEnglishReq.onerror = function() {
    // There was a connection error of some sort
  };
  getEnglishReq.send();


  /* 
    Handle language selections
  */
  var request = new XMLHttpRequest();


  request.open('GET', 'inc/language.php', true);
  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      var language = JSON.parse(this.response);


      request.open('GET', 'lang/selection.json', true);
      request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
          // Success!
          var selection = JSON.parse(this.response);

          for (var key in selection) {
            if (selection.hasOwnProperty(key)) {

              var newLangAnchor = document.createElement('a');
              newLangAnchor.href = '#';
              newLangAnchor.textContent = selection[key].name;
              newLangAnchor.setAttribute('data-lang',key);
              newLangAnchor.onclick = function() {

                var itemLangCode = this.getAttribute('data-lang');
                document.cookie = 'CCX_Language=' + itemLangCode + '; max-age=2629800; samesite=strict; secure';


                request.open('GET', 'lang/' + itemLangCode + '.json', true);
                request.onload = function() {
                  if (this.status >= 200 && this.status < 400) {
                    // Success!
                    var langData = JSON.parse(this.response);

                    selectedLanguageEl = document.getElementById('selectedLanguage');
                    selectedLanguageEl.textContent = selection[itemLangCode].name;
                    langDropDown = document.getElementById('langDropdown');
                    langDropDown.setAttribute('style','display:none;');
                    translate(langData);

                  } else {
                    // We reached our target server, but it returned an error
                  }
                };
                request.onerror = function() {
                  // There was a connection error of some sort
                };
                request.send(); // request.open('GET', 'lang/' + itemLangCode + '.json', true);

              };

              langDropDown = document.getElementById('langDropdown');
              langDropDown.appendChild(newLangAnchor);

            }
          }


          request.open('GET', 'lang/' + language + '.json', true);
          request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
              // Success!
              var langData = JSON.parse(this.response);

              document.getElementById('selectedLanguage').textContent = selection[language].name;
              translate(langData);

            } else {
              // We reached our target server, but it returned an error
            }
          };
          request.onerror = function() {
            // There was a connection error of some sort
          };
          request.send(); // request.open('GET', 'lang/' + language + '.json', true);


        } else {
          // We reached our target server, but it returned an error
        }
      };
      request.onerror = function() {
        // There was a connection error of some sort
      };
      request.send(); // request.open('GET', 'lang/selection.json', true);


    } else {
      // We reached our target server, but it returned an error
    }
  };
  request.onerror = function() {
    // There was a connection error of some sort
  };
  request.send(); // request.open('GET', 'inc/language.php', true);


  document.onclick = function(event) {
    if (!event.target.closest('#langSelector')) {
      langDropDown = document.getElementById('langDropdown');
      langDDcurStyle = langDropDown.getAttribute('style');
      if(langDDcurStyle==null) {
        langDropDown.setAttribute('style','display:none;');
        return;
      }
      if(langDDcurStyle.indexOf('block')!==-1) {
        langDropDown.setAttribute('style','display:none;');
      }
    }
  };

  document.getElementById('langSelector').onclick = function () {
    langDropDown = document.getElementById('langDropdown');
    langDDcurStyle = langDropDown.getAttribute('style');
    if(langDDcurStyle==null) {
      langDropDown.setAttribute('style','display:block;');
      return;
    }
    if(langDDcurStyle.indexOf('none')!==-1) {
      langDropDown.setAttribute('style','display:block;');
    } else {
      langDropDown.setAttribute('style','display:none;');
    }
  };

}); // document.addEventListener("DOMContentLoaded", function(){