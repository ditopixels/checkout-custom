/**
 * Remueve un parametro de una url
 * @method replaceUrlParam
 * @param {string} - Nombre de parametro
 * @param {string} - URL(opcional)
 * @returns {string} - URL resultante
*/
export default function (e, o) {
  o = o || document.location.href;
  var i, a = o.split('?')[0],
    s = [],
    n = -1 !== o.indexOf('?') ? o.split('?')[1] : '';
  if ('' !== n) {
    s = n.split('&');
    for (var r = s.length - 1; r >= 0; r -= 1) i = s[r].split('=')[0], i === e && s.splice(r, 1);
    a = a + '?' + s.join('&');
  }
  return a;
}