/**
*     extraer un parametro por nombre en una url
*     @method getParameterByName
*			@param {string} - URL
*			@param {string} - Nombre de parametro
*     @returns {promise}
*/

export default function (name, url) {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}