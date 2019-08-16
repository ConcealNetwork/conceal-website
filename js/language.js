$(document).ready(function () {
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

  $.getJSON('inc/language.php', function (language, textStatus, jqXHR) {
    $.getJSON('lang/selection.json', function (selection, textStatus, jqXHR) {

      for (var key in selection) {
        if (selection.hasOwnProperty(key)) {
          jQuery('<a>', {
            href: '#',
            text: selection[key].name,
            "data-lang": key,
            click: function () {
              var itemLangCode = $(this).attr("data-lang");
              $.cookie('CCX_Language', itemLangCode, { expires: 30 });
              $.getJSON('lang/' + itemLangCode + '.json', function (langData, textStatus, jqXHR) {
                $("#selectedLanguage").html(selection[itemLangCode].name);
                $("#langDropdown").hide();
                translate(langData);
              });
            }
          }).appendTo('#langDropdown');
        }
      }

      $.getJSON('lang/' + language + '.json', function (langData, textStatus, jqXHR) {
        $("#selectedLanguage").html(selection[language].name);
        translate(langData);
      });
    });
  });

  $(".language-selector").bind("click", function (event) {
    event.stopPropagation();
    $("#langDropdown").toggle();
  });

  $(document).bind("click", function () {
    $("#langDropdown").hide();
  });
});
