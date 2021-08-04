/**
* Crea una cookie
* @param  {string} _cookieName  nombre de la cookie
* @param  {string} _cookieValue valor de la cookie
* @param  {string} _days        duración de la cookie en días
*/
export default function (_cookieName, _cookieValue, _days) {
  var expires, domain;

  // Si existe el parámetro days, se suma esos días a la fecha actual
  if (_days) {
    var date = new Date;
    date.setTime(date.getTime() + 24 * _days * 60 * 60 * 1e3);
    expires = '; expires=' + date.toGMTString();
  } else {
    // Si no existe el parámetro days, se crea sin tiempo de expiración
    expires = '';
  }

  domain = window.location.hostname;
  //domain = domain.replace("www.", "");
  //domain = domain.replace("www2.", "");
  document.cookie = _cookieName + '=' + _cookieValue + expires + ';domain=.' + domain + ';path=/';
}