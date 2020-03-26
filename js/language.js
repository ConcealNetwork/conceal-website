document.addEventListener("DOMContentLoaded", function(event) { 
  var translate = function (data) {
    langData = data;

    $("[tkey]").each(function (index) {
      var strTr = data[$(this).attr('tkey')];
      $(this).html(strTr);
    });

    $("[tplaceholder]").each(function (index) {
      var strTr = data[$(this).attr('tplaceholder')];
      $(this).attr('placeholder', strTr);
    });

    $("[tvalue]").each(function (index) {
      var strTr = data[$(this).attr('tvalue')];
      $(this).attr('value', strTr);
    });

    $("[tdata-original-title]").each(function (index) {
      var strTr = data[$(this).attr('tdata-original-title')];
      $(this).attr('data-original-title', strTr);
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
                  document.cookie = 'CCX_Language=' + itemLangCode + '; max-age=2629800';

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

                $("#selectedLanguage").html(selection[language].name);
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

  // Toggle element visibility
  var toggle = function (elem) {
    elem.classList.toggle('is-visible');
  };

  // Listen for click events
  document.addEventListener('click', function (event) {

    // Make sure clicked element is our toggle
    if (!event.target.classList.contains('toggle')) return;

    // Prevent default link behavior
    event.preventDefault();

    // Get the content
    var content = document.querySelector(event.target.hash);
    if (!content) return;

    // Toggle the content
    toggle(content);

  }, false);

  document.onclick = function(event) {
    if (!event.target.closest('#langSelector')) {
      langDropDown = document.getElementById('langDropdown');
      langDDcurStyle = langDropDown.getAttribute('style');
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