$(document).ready(function () {
  var loadingIndicator = $("#contact").loadingIndicator({
    useImage: false,
    showOnInit: false
  }).data("loadingIndicator");

  var isSuccess = false;

  $(document).on('closed', '.remodal', function (e) {
    if (isSuccess) {
      location.href = "/";
    }
  });

  var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
  });

  function showError(responseText, statusText, xhr, $form) {
    loadingIndicator.hide();
    $("#contactResultTitle").html("Error");
    $("#contactResultMessage").html("Internal server error!");
    var inst = $('[data-remodal-id=contact_finished]').remodal();
    inst.open();
  }

  function showSuccess(responseText, statusText, xhr, $form) {
    loadingIndicator.hide();

    if (xhr.status == 200) {
      resultJSON = jQuery.parseJSON(responseText);

      if (resultJSON.exitCode == 0) {
        $("#contactResultTitle").html("Success");
        isSuccess = true;
      } else {
        $("#contactResultTitle").html("Error");
        isSuccess = false;
      }

      $("#contactResultMessage").html(resultJSON.exitDesc);
      var inst = $('[data-remodal-id=contact_finished]').remodal();
      inst.open();
    }
  }

  $('#contact_form').submit(function () {
    isSuccess = false;
    loadingIndicator.show();

    $(this).ajaxSubmit({
      success: showSuccess,
      error: showError
    });
    return false;
  });
});