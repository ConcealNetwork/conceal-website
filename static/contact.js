var
contactForm = d.querySelector('#contactMe form'),
contactFormSubject = d.getElementById('contact_subject'),
contactSelect = false,
contactModal, contactInner, contactH2, contactSpinner, contactMessage,
contactAjax,
contactRoot = String(window.location),
contactHash = d.getElementById('contact_hash');
    
contactRoot = contactRoot.substr(0, contactRoot.lastIndexOf('/') + 1);

if (contactForm)
    contactForm.addEventListener('submit', contactFormSubmit, false);
    
function contactFormSubmit(e) {

    eventPrevent(e);
    
    if (contactSelect) {
        contactH2.textContent = 'Sending Message';
        contactMessage.textContent = 'Subject: ' + contactFormSubject.value;
        contactSelect.checked = true;
    } else {
        contactSelect = make('input#toggle_contactAjax.toggle', {
            type : 'radio',
            name : 'toggleModal',
            hidden : true,
            checked : true,
            last : d.body
        });
        contactModal = make('div#contactAjax.modal', { last : d.body });
        contactInner = make('div', { last : contactModal });
        contactH2 = make('h2', {
            content : 'Sending Message',
            last : contactInner
        });
        contactSpinner = make('i.spinner', { last : contactInner });
        contactMessage = make('div.contactModalMessage', {
            content : 'Subject: ' + contactFormSubject.value,
            last : contactInner
        });
    }
    
    contactModal.classList.add('loading');
    
    // flush existing error messages
    
    var errorMessages = contactForm.getElementsByClassName('error');
    while (errorMessages.length) remove(errorMessages[0]);
        
    var data = new FormData(contactForm);
    
    contactAjax = new XMLHttpRequest();
    contactAjax.onreadystatechange = contactAjaxStateChange;
    if (contactAjax.overrideMimeType) 
        contactAjax.overrideMimeType('application/json');
    contactAjax.open('POST', contactRoot + 'ajaxMail');
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
                        var element = d.getElementById(i);
                        if (element) make('p.error', {
                            after : element,
                            content : data.errors[i]
                        });
                    }
                    break;
            }
            break;
    }
} // contactAjaxStateChange