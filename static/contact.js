function make(tagName, attribs) {
  var
    e = document.createElement(tagName),
    appended = false;
  for (var attrName in attribs) {
    var attr = attribs[attrName];
    switch (attrName) {
      case 'events':
        for (var eventName in attr)
          e.addEventListener(eventName, attr[eventName], false);
        break;
      case 'firstIn':
        attr.insertBefore(e, attr.firstChild);
        break;
      case 'lastIn':
        attr.appendChild(e);
        break;
      case 'style':
        for (var styleName in attr) e.style[styleName] = attr[styleName];
        break;
      case 'content':
        e.appendChild('object' == typeof attr ? attr : document.createTextNode(attr));
        break;
      default:
        if (
          ('object' == typeof attr) ||
          ('function' == typeof attr) ||
          (attr instanceof Array)
        ) e[attrName] = attr;
        else e.setAttribute(attrName, attr);
    }
  }
  return e;
} // make

var
  contactForm = document.getElementById('contact_form'),
  contactFormSubject = document.getElementById('contact_subject'),
  contactSelect = false,
  contactModal, contactInner, contactH2, contactSpinner, contactMessage,
  contactAjax,
  contactRoot = String(window.location),
  contactHash = document.getElementById('contact_hash');

contactRoot = contactRoot.substr(0, contactRoot.lastIndexOf('/') + 1);

if (contactForm) {
  contactForm.addEventListener('submit', contactFormSubmit, false);
}

function contactFormSubmit(e) {
  e.preventDefault();

  if (contactSelect) {
    contactH2.textContent = 'Sending Message';
    contactMessage.textContent = 'Subject: ' + contactFormSubject.value;
    contactSelect.checked = true;
  } else {
    contactSelect = make('input', {
      id: 'toggle_contactAjax',
      class: 'toggle',
      type: 'radio',
      name: 'toggleModal',
      hidden: true,
      checked: true,
      last: document.body
    });
    contactModal = make('div', {
      id: 'contactAjax',
      class: 'modal',
      last: document.body
    });
    contactInner = make('div', { last: contactModal });
    contactH2 = make('h2', {
      content: 'Sending Message',
      last: contactInner
    });
    contactSpinner = make('i.spinner', { class: 'spinner', last: contactInner });
    contactMessage = make('div', {
      class: 'contactModalMessage',
      content: 'Subject: ' + contactFormSubject.value,
      last: contactInner
    });
  }

  contactModal.classList.add('loading');

  // flush existing error messages

  var errorMessages = contactForm.getElementsByClassName('error');
  while (errorMessages.length) remove(errorMessages[0]);

  var data = new FormData(contactForm);

  contactAjax = new XMLHttpRequest();
  contactAjax.onreadystatechange = contactAjaxStateChange;
  contactAjax.open('POST', 'newcontact.php');
  contactAjax.send(data);

} // contactFormSubmit

function contactAjaxStateChange() {
  switch (contactAjax.readyState) {
    case 4:
      var
        data = JSON.parse(contactAjax.response),
        newMessage = HTML2DOM(data.content).firstElementChild;
      contactH2.textContent = data.title;
      contactMessage.parentNode.replaceChild(newMessage, contactMessage);
      contactMessage = newMessage;
      if (data.newHash) contactHash.value = data.newHash;
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
      }
      break;
  }
} // contactAjaxStateChange