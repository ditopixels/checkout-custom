// Formateamos el precio
export const formatPrice = (value, decimals, separators) => {
  decimals = decimals >= 0 ? parseInt(decimals, 0) : 2;
  separators = separators || ['.', "'", ','];
  var number = (parseFloat(value) || 0).toFixed(decimals);
  if (number.length <= (3 + decimals))
      return number.replace('.', separators[separators.length - 1]);
  var parts = number.split(/[-.]/);
  value = parts[parts.length > 1 ? parts.length - 2 : 0];
  var result = value.substr(value.length - 3, 3) + (parts.length > 1 ?
      separators[separators.length - 1] + parts[parts.length - 1] : '');
  var start = value.length - 6;
  var idx = 0;
  while (start > -3) {
      result = (start > 0 ? value.substr(start, 3) : value.substr(0, 3 + start)) +
          separators[idx] + result;
      idx = (++idx) % 2;
      start -= 3;
  }
  return (parts.length == 3 ? '-' : '') + result;
}

export const cleanNumber = (numberString)  => {
  numberString = replaceAll(numberString, "$", '');
  numberString = replaceAll(numberString, ".", '');
  numberString = replaceAll(numberString, ",", '.');
  
  return Number(numberString);
}

export const replaceAll = ( text, busca, reemplaza ) => { 
  while (text.toString().indexOf(busca) != -1)
  {
    text = text.toString().replace(busca,reemplaza);
  }
  return text;
}

export const replaceDecimals = (priceString) => {
  if (priceString) {
    return priceString.replace(/\s/, '').replace(",00", '').replace(",0", '');
  }
};

export const getOptionsSend = (getSkuId, postalCode, salesChannel = 1) => {
  // Consultando a Vtex
  var def = $.Deferred();
  var setSend = {
    items: function(item) {
      return item.map(function(skuId) {
        return {
          id: Number(skuId),
          quantity: 1,
          seller: '1'
        };
      });
    },
    logisticsInfo: function(sla) {
      return {
        slas:
          sla
            .map(function(sla) {
              return sla.slas;
            })
            .find(function(sla) {
              return sla.length;
            }) || []
      };
    }
  };
  //
  var setItems = setSend.items(getSkuId);
  //
  return $.ajax({
    url: '/api/checkout/pub/orderForms/simulation?sc=' + salesChannel,
    type: 'POST',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: JSON.stringify({
      items: setItems,
      postalCode: postalCode,
      country: 'PER'
    })
  })
  .done(function(responseSla) {
    def.resolve(setSend.logisticsInfo(responseSla.logisticsInfo));
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    def.reject(jqXHR, textStatus, errorThrown);
  });
}

/**
 * Check if the given value is a string.
 *
 * @category Validate
 * @param {*} value - The value to check.
 * @return {boolean} Returns 'true' if the given value is a string, else 'false'.
 */
const isString = (value) => {
  return Object.prototype.toString.call(value) === '[object String]';
}

/**
 * Check if the given value is a number.
 *
 * @category Validate
 * @param {*} value - The value to check.
 * @return {boolean} Returns 'true' if the given value is a number, else 'false'.
 */
const isNumber = (value) => {
  var isNaN = Number.isNaN || window.isNaN;
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Formats Vtex price
 *
 * @param {integer}             number              The number to format
 * @param {string}              [thousands = '.']   The thousands delimiter
 * @param {string}              [decimals = ',']    The decimal delimiter
 * @param {integer}             [length = 2]        The length of decimal
 * @param {string}              [currency = 'R$ ']  Set currency
 * @return {string} The formatted price
 */

// vtexFormatPrice(totalPrice, '.', ',', 0, '$ ') <-- PARA COLOMBIA
// vtexHelpers.formatPrice(123456, ',', '.', 2, '$ '); // $ 1,234.56

export const vtexFormatPrice = (number, thousands, decimals, length, currency) => {
  currency = isString(currency) ? currency : '$ ';
  length = !isNumber(length) ? 2 : length;

  var re = '\\d(?=(\\d{' + 3 + '})+' + (length > 0 ? '\\D' : '$') + ')';
  number = number / 100;
  number = (number * 1).toFixed(Math.max(0, ~~length));

  return currency + number.replace('.', decimals || ',').replace(new RegExp(re, 'g'), '$&' + (thousands || '.'));
}

/**
 * Revisa constantemente si un elemento existe en el DOM
 * @method waitForElement
 * @param  {string} _selector selector para usarlo con jquery
 * @param  {object} _callback función devuelta
 * @return {type}           description
 */
export const WaitForElement = (_selector, _callback) => {
  var waitForElementTimer;

  waitForElementTimer = setInterval(function () {
    if ($(_selector).length > 0) {
      clearInterval(waitForElementTimer);
      _callback();
      return;
    }
  }, 100);
}
