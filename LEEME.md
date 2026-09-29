# REFORBRAS — web para Hostinger

Primera versión revisable, 29 de septiembre de 2026. No se ha publicado ni se ha accedido al hosting.

## Qué incluye

17 páginas HTML, diseño adaptable, logo original, paleta antracita/blanco/verde, formulario con validación, integración configurable de teléfono y WhatsApp, cuatro páginas de servicios, proyectos con comparador preparado, testimonios, proceso, zonas, preguntas frecuentes, borradores legales y página 404.

La tipografía del logo se conserva dentro de la imagen original. La web utiliza Arial Black y Arial como aproximación compatible a su estilo geométrico, sin afirmar que sean la fuente original ni descargar fuentes externas. El encabezado usa #3f3e3e, medido en el fondo del logo. Su imagen tiene pequeñas variaciones de textura; un original vectorial o transparente permitiría una integración aún más precisa.

## Ver y editar

Necesita Node.js 20 o posterior solo en el ordenador de edición. El hosting no necesita Node.

```text
npm run build
npm run preview
```

Abrir http://127.0.0.1:4173. Para la comprobación de enlaces y metadatos: `npm run check`.

- `site.config.json`: identidad, dominio, contacto, municipios, proyectos y opiniones.
- `scripts/build.mjs`: contenido de todas las páginas y plantillas SEO.
- `public/assets/style.css`: diseño y adaptación móvil.
- `public/assets/site.js`: menú, comparador y formulario.
- `public/`: archivos públicos que se copian al hosting.
- `private/`: plantilla de correo y dependencia PHPMailer. Nunca subir dentro de public_html.

No es WordPress ni Hostinger Website Builder. Es una web estática con un pequeño receptor PHP. Para cambiar textos se modifica el generador y se vuelve a generar. No necesita base de datos ni instalación de paquetes JavaScript.

## Datos que faltan

Dominio, teléfono con prefijo internacional, correo, razón social, NIF/CIF, domicilio, equipo e historia real, servicios confirmados, municipios cubiertos, fotos autorizadas y reseñas reales. Confirmar también las condiciones comerciales del proceso propuesto. No se han inventado años de experiencia, puntuaciones, garantías, plazos, cifras de obras ni testimonios.

La foto es una imagen generada de inspiración. No es un proyecto de REFORBRAS. La zona antes/después no simula una obra: espera fotos reales.

## Publicar en Hostinger, tras aprobar la vista previa

1. Confirmar que el plan permite una web PHP/HTML con acceso al administrador de archivos. Hostinger Website Builder no permite desplegar este paquete de la misma forma. No borrar ni sustituir el sitio existente para cambiar de modalidad sin autorización.
2. Descargar una copia de seguridad del sitio actual y anotar la carpeta del dominio. Usar primero un subdominio de pruebas protegido si está disponible. `noindex` no es una contraseña ni una restricción de acceso.
3. Completar `site.config.json`, revisar todos los textos y los borradores legales. Confirmar servicios, áreas y permisos de fotografías. La política de privacidad necesita concretar base del tratamiento, conservación, proveedores y derechos; no basta cambiar una casilla.
4. Configurar el correo según la sección siguiente. Completar y comprobar los canales `tel:` y `wa.me` con datos reales.
5. Tras la aprobación de publicación, poner `preview: false`, `contactEnabled: true`, `servicesConfirmed: true`, `legalReviewed: true` y `contentApproved: true`; generar y comprobar. El generador rechaza producción si faltan los datos esenciales. Estas casillas registran una revisión humana: no reemplazan esa revisión.
6. Subir **el contenido** de `public/` a la carpeta `public_html` del dominio, incluyendo `.htaccess`. No subir `site.config.json`, los scripts ni este documento. No sobrescribir el sitio existente hasta la aprobación final del propietario.
7. Subir el contenido de `private/` a una carpeta hermana llamada `reforbras-private`, fuera de `public_html`. Estructura: `public_html/api/contact.php` y `reforbras-private/config.php` + `reforbras-private/vendor/PHPMailer/...`.
8. Activar HTTPS en el dominio desde Hostinger; confirmar que la variante elegida (con o sin www) redirige a la canónica. Configurar la misma URL exacta en `domain` y en `origin` del correo. Conservar cualquier regla del hosting necesaria para el dominio.
9. Probar todas las rutas, un 404 real, contacto válido e inválido, respuesta de error, límites de envío y recepción efectiva del correo. Revisar también móvil y navegación por teclado. La prueba SMTP solo cuenta como aprobada si el mensaje llega al buzón esperado.
10. Comprobar canonical, robots y sitemap con el dominio definitivo. Registrar el sitio en Search Console y presentar sitemap.xml después de publicar y verificar el dominio.

## Correo real

Se incluye PHPMailer 7.1.1 (LGPL; licencia en `private/vendor/PHPMailer/LICENSE`) para SMTP autenticado. No se usa la función básica `mail()`.

Copiar `private/config.example.php` como `reforbras-private/config.php` y completar host, puerto, cifrado, usuario y contraseña SMTP según el proveedor. El remitente debe ser un buzón autorizado del dominio. El destinatario se fija en el servidor, nunca se acepta del formulario. La dirección del visitante solo es Reply-To. Generar `rate_secret` con al menos 32 caracteres aleatorios. No enviar contraseñas en el chat ni guardarlas en el directorio público.

Requisitos: PHP 8.1 o superior con OpenSSL, conexión saliente SMTP y escritura en `reforbras-private/rate/`. Limitar permisos del archivo de configuración al usuario del hosting. Activar `enabled` solo después de verificar la configuración. Configurar SPF/DKIM y revisar la entregabilidad con el proveedor.

El receptor valida los campos, exige JSON y el origen configurado, usa un campo antispam y limita cinco intentos por IP/hora y cuarenta globales/hora. Mantiene durante una hora contadores y hashes, sin almacenar consultas ni IP en claro. No sustituye un servicio antispam avanzado. Los datos enviados llegan al buzón y su conservación debe formar parte de la política del titular.

El envío está desactivado en la vista previa. El receptor PHP no se ha ejecutado aquí, ya que no hay PHP instalado. SMTP, configuración Apache/LiteSpeed y recepción deben verificarse en el entorno Hostinger antes de la publicación final.

## Añadir proyectos y testimonios

En `projects`, añadir objetos con `title`, `location`, `type`, `description`, `before` y `after`. Las imágenes deben ser rutas locales `/assets/nombre.webp`, fotos reales del mismo espacio y con autorización. Al generar, cada caso incorpora un comparador manejable con teclado y tacto. La sección vacía desaparece al existir casos. No colocar dos imágenes de proyectos distintos como antes y después.

En `testimonials`, añadir `name`, `project`, `text` y, si existe, `source` (enlace a la reseña original). Solo opiniones reales verificadas y autorizadas. El contenido se escapa para evitar insertar HTML accidentalmente.

## Referencias técnicas

- [Hostinger: subir una web](https://www.hostinger.com/tutorials/how-to-upload-your-website/)
- [Hostinger: administrador de archivos](https://support.hostinger.com/en/articles/4548688-basic-actions-in-the-file-manager)
- [Hostinger: ventajas de SMTP frente a mail()](https://www.hostinger.com/support/11393648-php-mail-limitation-explained-how-to-improve-email-delivery-with-smtp/)
- [PHPMailer 7.1.1](https://github.com/PHPMailer/PHPMailer/releases/tag/v7.1.1)
- [AEPD: deber de informar](https://www.aepd.es/documento/guia-modelo-clausula-informativa.pdf)

## Revisión visual posterior
El pie de página comparte ahora el gris #3f3e3e del encabezado y el logo. Se eliminó la numeración decorativa de los reclamos, secciones y servicios; solo se numeran las fases del proceso. Cada servicio dispone de una imagen de inspiración en su tarjeta y página. La portada alterna cuatro imágenes cada seis segundos, con navegación manual y pausa. Se detiene al pasar el ratón, al entrar el foco del teclado, al ocultar la pestaña o si se solicita reducir movimiento. Con movimiento reducido se puede iniciar explícitamente mediante Reproducir.


## Datos de contacto incorporados
Correo destinatario: refobras.es@gmail.com. Teléfono: +34 613 503 677. Instagram: @refobras.es. Titular autónoma y gerente: Diana Marulanda. WhatsApp utiliza provisionalmente el mismo teléfono. El dominio sigue pendiente; no se ha inferido del correo o Instagram. El envío SMTP continúa desactivado.

## Dominio y WhatsApp confirmados
Dominio previsto: https://www.refobras.es. WhatsApp confirmado: +34 613 503 677. Los botones abren directamente el chat con un texto inicial, en otra pestaña. El visitante decide si envía el mensaje. El sitio sigue en vista previa noindex; no se ha publicado ni cambiado DNS. Formulario SMTP desactivado. Esta información sustituye las menciones anteriores a dominio pendiente y WhatsApp provisional.

## Proyectos pendientes, sin bloquear el lanzamiento
La página /proyectos/ y su bloque de portada muestran Próximamente, sin fotos de ejemplo ni comparadores vacíos. Los proyectos reales pueden incorporarse después del lanzamiento. Esta decisión no activa la publicación ni el correo.
