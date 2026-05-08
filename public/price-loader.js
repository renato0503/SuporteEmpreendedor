// Price Loader - loads prices from Firebase and updates the DOM
// Non-blocking async implementation

(function() {
  'use strict';

  // Service ID mapping to Firebase field names
  var keyMap = {
    'abertura-mei': 'feeAbertura',
    'declaracao-anual-dasn': 'feeDasn',
    'dasan': 'feeDasn',
    'parcelamento-debitos-mei': 'feeParcelamento',
    'parcelamento': 'feeParcelamento',
    'alteracao-cadastral-mei': 'feeAlteracao',
    'baixa-mei-encerramento': 'feeBaixa',
    'baixa-mei': 'feeBaixa',
    'consulta-situacao-cadastral': 'feeConsulta'
  };

  // Default fallback prices
  var defaultPrices = {
    feeAbertura: 97,
    feeDasn: 67,
    feeParcelamento: 127,
    feeAlteracao: 67,
    feeBaixa: 97,
    feeConsulta: 47
  };

  // Project ID for REST API
  var projectId = 'suporte-empreendedor';

  function updateAllPrices(prices) {
    var elements = document.querySelectorAll('[data-service-price]');
    elements.forEach(function(el) {
      var serviceId = el.getAttribute('data-service-price');
      if (!serviceId || !prices) return;

      var priceKey = keyMap[serviceId];
      if (priceKey && prices[priceKey] !== undefined) {
        var price = parseFloat(prices[priceKey]);
        if (!isNaN(price)) {
          el.textContent = price.toFixed(2).replace('.', ',');
        }
      }
    });
  }

  // Use Firestore REST API (non-blocking)
  function fetchPricesREST() {
    var url = 'https://firestore.googleapis.com/v1/projects/' + projectId + '/databases/(default)/documents/settings/global';
    
    fetch(url)
      .then(function(response) {
        if (!response.ok) throw new Error('Network response not ok');
        return response.json();
      })
      .then(function(data) {
        if (data.fields) {
          var prices = {};
          Object.keys(defaultPrices).forEach(function(key) {
            if (data.fields[key] && data.fields[key].integerValue) {
              prices[key] = parseInt(data.fields[key].integerValue);
            } else if (data.fields[key] && data.fields[key].doubleValue) {
              prices[key] = parseFloat(data.fields[key].doubleValue);
            } else {
              prices[key] = defaultPrices[key];
            }
          });
          updateAllPrices(prices);
        } else {
          updateAllPrices(defaultPrices);
        }
      })
      .catch(function() {
        updateAllPrices(defaultPrices);
      });
  }

  // Apply default prices immediately (non-blocking)
  updateAllPrices(defaultPrices);

  // Then try to fetch updated prices from Firebase
  setTimeout(fetchPricesREST, 500);
})();