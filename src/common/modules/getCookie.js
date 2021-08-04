/**
 * Busca el valor de una cookie y la devuelve
 * @param {string} _cookieName - nombre de la cookie que se busca
 * @returns {string}
 */
export default function (_cookieName) {
  for (var t = _cookieName + '=', o = document.cookie.split(';'), i = 0; i < o.length; i++) {
    for (var a = o[i]; ' ' === a.charAt(0);) {
      a = a.substring(1);
    }
    if (0 === a.indexOf(t)) {
      return a.substring(t.length, a.length);
    }
  }
  return '';
}