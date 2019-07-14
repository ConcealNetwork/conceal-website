var numberFormatter = new Intl.NumberFormat('en-US'); // US formatting, force commas.
var poolList = [];

var difficulties = [];
var totalHashrate = 0;
var totalMiners = 0;

var poolsRefreshed = 0;

var calculateTotalFee = function (config) {
  let totalFee = config.config.fee;
  for (let property in config.config.donation) {
    if (config.config.donation.hasOwnProperty(property)) {
      totalFee += config.config.donation[property];
    }
  }
  return Math.round(totalFee * 1000) / 1000;
};

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

var translateAPI2 = function (data) {
  return {
    'network': {
      'height': '',
    },
    'pool': {
      'hashrate': data.pool_statistics.hashRate,
      'miners': data.pool_statistics.miners,
    },
    'config': {
      'minPaymentThreshold': ''
    }
  };
};

$.getJSON('https://explorer.conceal.network/services/pools/list', function (data, textStatus, jqXHR) {
  poolList = data;
  console.log(poolList);

  poolList.forEach(function (element) {
    var url = element[1];
    var host = element[0];
    var name = element[2];
    var version = element[3];

    if (version == "1") {
      $.getJSON(url + '/stats', function (data, textStatus, jqXHR) {
        var index = host.indexOf('/');
        var poolName;

        if (index < 0) {
          poolName = host;
        } else {
          poolName = host.substr(0, index);
        }

        $('#pools_rows').append(renderPoolRow(name, host, poolName, data));
      }).always(function () {
        // do nothing
      });
    } else if (version == "2") {
      var index = host.indexOf("/");
      var poolName;

      if (index < 0) {
        poolName = host;
      } else {
        poolName = host.substr(0, index);
      }

      $.getJSON(url + '/pool/stats', function (data, textStatus, jqXHR) {
        var tdata = translateAPI2(data);
        $('#pools_rows').append(renderPoolRow(name, host, poolName, tdata));

        $.getJSON(url + '/network/stats', function (data, textStatus, jqXHR) {
          properHeight = data.height + 1;
          updateText('height-' + poolName, localizeNumber(properHeight));
        });
      }).always(function () {
        // do nothing
      });
    }
  });
});


setInterval(function () {

  poolList.forEach(function (element) {
    var url = element[1];
    var host = element[0];
    var name = element[2];
    var version = element[3];

    if (version == "1") {
      var index = host.indexOf("/");
      var poolName;
      if (index < 0) {
        poolName = host;
      } else {
        poolName = host.substr(0, index);
      }

      $.getJSON(url + '/stats', (data, textStatus, jqXHR) => {
        updateText('height-' + poolName, localizeNumber(data.network.height));
        updateText('hashrate-' + poolName, getReadableHashRateString(data.pool.hashrate));
        updateText('miners-' + poolName, localizeNumber(data.pool.miners));
      }).always(function () {
        // do nothing
      });
    } else {
      var index = host.indexOf("/");
      var poolName;
      if (index < 0) {
        poolName = host;
      } else {
        poolName = host.substr(0, index);
      }

      $.getJSON(url + '/pool/stats', (data, textStatus, jqXHR) => {
        updateText('hashrate-' + poolName, getReadableHashRateString(data.pool_statistics.hashRate));
        updateText('miners-' + poolName, localizeNumber(data.pool_statistics.miners));
      }).always(function () {
        // do nothing
      });

      $.getJSON(url + '/network/stats', (data, textStatus, jqXHR) => {
        updateText('height-' + poolName, localizeNumber(data.height));
      });
    }
  });

}, 120000);