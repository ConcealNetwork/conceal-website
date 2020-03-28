var numberFormatter = new Intl.NumberFormat('en-US'); // US formatting, force commas.
var arePoolsLoaded = false;

function localizeNumber(number) {
  return numberFormatter.format(number);
}

function updateText(elementId, text) {
  var el = document.getElementById(elementId);
  if (el.textContent !== text) {
    el.textContent = text;
  }
  return el;
}

function getReadableHashRateString(hashrate) {
  var i = 0;
  var byteUnits = [' H', ' kH', ' MH', ' GH', ' TH', ' PH', ' EH', ' ZH', ' YH'];
  while (hashrate > 1000) {
    hashrate = hashrate / 1000;
    i++;
  }
  return localizeNumber(hashrate.toFixed(2)) + byteUnits[i];
}

var renderPoolRow = function (label, host, name, data) {

  row = document.createElement('tr');

  td = document.createElement('td');
  td.id = 'host-' + name;
  a = document.createElement('a');
  a.href = 'http://' + host;
  a.target = 'blank';
  text = document.createTextNode(label);
  a.appendChild(text);
  td.appendChild(a);
  row.appendChild(td);

  td = document.createElement('td');
  td.id = 'height-' + name;
  td.class = 'height';
  text = document.createTextNode(localizeNumber(data.network.height));
  td.appendChild(text);
  row.appendChild(td);

  td = document.createElement('td');
  td.id = 'fee-' + name;
  text = document.createTextNode(data.config.poolFee + '%');
  td.appendChild(text);
  row.appendChild(td);

  td = document.createElement('td');
  td.id = 'hashrate-' + name;
  text = document.createTextNode(getReadableHashRateString(data.pool.hashrate));
  td.appendChild(text);
  row.appendChild(td);

  td = document.createElement('td');
  td.id = 'miners-' + name;
  text = document.createTextNode(localizeNumber(data.pool.miners));
  td.appendChild(text);
  row.appendChild(td);

  return row;
};

function getPoolName(data) {
  var host = data.info.host;
  var index = host.indexOf('/');

  if (index < 0) {
    return host;
  } else {
    return host.substr(0, index);
  }
}

function checkVisible(elm) {
  var rect = elm.getBoundingClientRect();
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

window.addEventListener('scroll', function() {
  if(checkVisible(document.getElementById('mining'))) {
    if (!arePoolsLoaded) {
      arePoolsLoaded = true;
      var request = new XMLHttpRequest();
      request.open('GET', 'https://explorer.conceal.network/services/pools/data', true);
      request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
          // Success!
          var data = JSON.parse(this.response);

          function compare(a, b) {
            if (a.config.poolFee > b.config.poolFee) return 1;
            if (b.config.poolFee > a.config.poolFee) return -1;
            return 0;
          }
          data.sort(compare);
          data.forEach(function (element) {
            document.querySelector('#poolsTable tbody').appendChild(
              renderPoolRow(
                element.info.name, 
                element.info.host, 
                getPoolName(element), 
                element
              )
            );
          });
          document.getElementById('poolsTable').setAttribute('style','display:block;');
        } else {
          // We reached our target server, but it returned an error
        }
      };
      request.onerror = function() {
        // There was a connection error of some sort
      };
      request.send();
    }
  }
});