var numberFormatter = new Intl.NumberFormat('en-US'); // US formatting, force commas.
var arePoolsLoaded = false;

function localizeNumber(number) {
  return numberFormatter.format(number);
}

function updateText(elementId, text) {
  var el = document.getElementById(elementId);
  if ($(el).html !== text) {
    $(el).html(text);
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
  var pools_row = [];

  pools_row.push('<tr>');
  pools_row.push('<td id=host-' + name + '><a target=blank href=http://' + host + '>' + label + '</a></td>');
  pools_row.push('<td class="height" id=height-' + name + '>' + localizeNumber(data.network.height) + '</td>');
  pools_row.push('<td id=hashrate-' + name + '>' + getReadableHashRateString(data.pool.hashrate) + '</td>');
  pools_row.push('<td id=miners-' + name + '>' + localizeNumber(data.pool.miners) + '</td>');
  pools_row.push('</tr>');

  return pools_row.join('');
};

function getPoolName(data) {
  var host = data.info.host;
  var index = host.indexOf('/');
  var poolName;

  if (index < 0) {
    return host;
  } else {
    return host.substr(0, index);
  }
}

$(window).scroll(function () {
  // This is then function used to detect if the element is scrolled into view
  function elementScrolled(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
  }

  // This is where we use the function to detect if ".box2" is scrolled into view, and when it is add the class ".animated" to the <p> child element
  if (elementScrolled('#mining')) {
    if (!arePoolsLoaded) {
      arePoolsLoaded = true;

      $.getJSON('https://explorer.conceal.network/services/pools/data', function (data, textStatus, jqXHR) {
        data.forEach(function (element) {
          $('#pools_rows').append(renderPoolRow(element.info.name, element.info.host, getPoolName(element), element));
        });
      });
    }
  }
});