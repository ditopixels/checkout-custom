export default function (_cookieName, _cookieValue, _days) {
  var expires, domain;
  if (_days) {
    var date = new Date;
    date.setTime(date.getTime() + 24 * _days * 60 * 60 * 1e3);
    expires = '; expires=' + date.toGMTString();
  } else {
    // Si no existe el parámetro days, se crea sin tiempo de expiración
    expires = '';
  }
  domain = window.location.hostname;
  document.cookie = _cookieName + '=' + _cookieValue + expires + ';domain=.' + domain + '; path=/';
}