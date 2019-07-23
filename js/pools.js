var numberFormatter = new Intl.NumberFormat('en-US'); // US formatting, force commas.

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

$.getJSON('https://explorer.conceal.network/services/pools/data', function (data, textStatus, jqXHR) {
  data.forEach(function (element) {
    $('#pools_rows').append(renderPoolRow(element.info.name, element.info.host, getPoolName(element), element));
  });
});

setInterval(function () {
  $.getJSON('https://explorer.conceal.network/services/pools/data', function (data, textStatus, jqXHR) {
    data.forEach(function (element) {
      updateText('height-' + poolName, localizeNumber(element.network.height));
      updateText('hashrate-' + poolName, getReadableHashRateString(element.pool.hashrate));
      updateText('miners-' + poolName, localizeNumber(element.pool.miners));
    });
  });
}, 120000);