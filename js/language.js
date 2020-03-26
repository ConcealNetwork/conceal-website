document.addEventListener("DOMContentLoaded", function(event) { 
  var translate = function (data) {
    langData = data;

    tkeys = document.querySelectorAll('[tkey]');
    Array.prototype.forEach.call(tkeys, function(element, index, array){
      var strTr = data[element.getAttribute('tkey')];
      element.textContent = strTr;
    });

    tplaceholders = document.querySelectorAll('[tplaceholder]');
    Array.prototype.forEach.call(tplaceholders, function(element, index, array){
      var strTr = data[element.getAttribute('tplaceholder')];
      element.setAttribute('placeholder',strTr);
    });

    tvalues = document.querySelectorAll('[tvalue]');
    Array.prototype.forEach.call(tvalues, function(element, index, array){
      var strTr = data[element.getAttribute('tvalue')];
      element.setAttribute('value',strTr);
    });

    torigtitles = document.querySelectorAll('[tdata-original-title]');
    Array.prototype.forEach.call(torigtitles, function(element, index, array){
      var strTr = data[element.getAttribute('tdata-original-title')];
      element.setAttribute('data-original-title',strTr);
    });
    
  }

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
                request.send();

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
          request.send();


        } else {
          // We reached our target server, but it returned an error
        }
      };
      request.onerror = function() {
        // There was a connection error of some sort
      };
      request.send();


    } else {
      // We reached our target server, but it returned an error
    }
  };
  request.onerror = function() {
    // There was a connection error of some sort
  };
  request.send();

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

});