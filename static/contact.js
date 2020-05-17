var
  contactForm = document.getElementById('contact_form'),
  contactFormSubject = document.getElementById('contact_subject'),
  statusMessage = false,
  contactModal, contactInner, contactH2, contactSpinner, contactMessage,
  contactAjax,
  contactRoot = String(window.location),
  contactHash = document.getElementById('contact_hash');

contactRoot = contactRoot.substr(0, contactRoot.lastIndexOf('/') + 1);

if (contactForm) {
  contactForm.addEventListener('submit', contactFormSubmit, false);
}

function contactFormSubmit(e) {
  // IE 10 doesn't know "preventDefault"
  if (e.preventDefault) e.preventDefault();
  // and incorrectly uses "returnValue" instead
  else e.returnValue = false;

  if (statusMessage) {
    statusH3.textContent = 'Sending Message';
    statusMessageContent.textContent = 'Subject: ' + contactFormSubject.value;
  } else {
    statusMessage = document.createElement('div');
    statusMessage.class = 'statusMessage';
    statusH3 = document.createElement('h3');
    statusH3.textContent = 'Sending Message';
    statusMessage.appendChild(statusH3);
    statusMessageContent = document.createElement('p');
    statusMessageContent.textContent = 'Subject: ' + contactFormSubject.value;
    statusMessage.appendChild(statusMessageContent);
    contactForm.appendChild(statusMessage);
  }

  statusMessage.classList.add('loading');

  // flush existing error messages

  /*var errorMessages = contactForm.getElementsByClassName('error');
  while (errorMessages.length) remove(errorMessages[0]);*/

  var data = new FormData(contactForm);

  contactAjax = new XMLHttpRequest();
  if (contactAjax.overrideMimeType) 
    contactAjax.overrideMimeType('application/json');
  contactAjax.responseType = 'json';
  contactAjax.onreadystatechange = contactAjaxStateChange;
  contactAjax.open('POST', 'newcontact.php');
  contactAjax.send(data);

} // contactFormSubmit

function contactAjaxStateChange() {
  switch (contactAjax.readyState) {
    case 4:
      var data = JSON.parse(contactAjax.response);
      statusH3.textContent = data.title;
      statusMessageContent.textContent = data.content;
      /*if (data.newHash) contactHash.value = data.newHash;
      switch (contactAjax.status) {
        case 200:
        case 403:
          contactForm.reset();
          break;
        case 406:
          for (var i in data.errors) {
            var element = document.getElementById(i);
            if (element) make('p.error', {
              after: element,
              content: data.errors[i]
            });
          }
          break;
      }*/
      break;
  }
} // contactAjaxStateChange