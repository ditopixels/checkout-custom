# Front Vtex

NODE V=13.3.0

<!-- Ejecutar Site[DecorCeramica] -->
npm run dev -- --env.site=sanisidro

npm run prod -- --env.site=sanisidro


# Como Activar el QuickView
1.- Você pode utilizar o controle na prateleira:
  $product.QuickView

2.- No template do quickview, adicionar:
<vtex.cmc:productQuickView/>

3.- Si en caso no funcione reemplazar el HTTPS

https://www.calvinklein.mx/hombre/ropa
https://calvinkleinmx.vteximg.com.br/arquivos/css-js_quick-view.js


# Ejemplo de como llamar un componente de "common":

import 'common/miniCart';