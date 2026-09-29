# REFORBRAS — web de reformas en Valencia

Web adaptable con servicios, carrusel, proyectos próximamente, presentación, proceso, preguntas frecuentes y contacto directo por WhatsApp, teléfono y correo.

## Desarrollo local

Requiere Node.js 20 o posterior. No requiere instalar dependencias JavaScript.

```sh
npm run build
npm run check
npm run preview
```

Vista previa: http://127.0.0.1:4173.

La configuración principal está en `site.config.json`. Se mantiene en modo de vista previa. `site.release.json` contiene la configuración preparada para el dominio definitivo; no activa despliegues automáticos.

## Archivos

- `scripts/build.mjs`: generador de páginas y contenidos.
- `public/`: sitio generado, imágenes, estilos y comportamiento.
- `private/config.example.php`: ejemplo sin contraseñas para una futura integración SMTP; el lanzamiento actual utiliza contacto directo.
- `LEEME.md`: instrucciones de edición y Hostinger.
- `INVESTIGACION-Y-SEO.md`: referencias y decisiones de diseño.
- `PARA-REVISAR-CON-DIANA.md`: decisiones pendientes del titular.

## Publicación

El destino previsto es Hostinger, https://www.refobras.es. Guardar el código en GitHub no publica la web. No hay integración de despliegue automático ni GitHub Pages.

No subir contraseñas SMTP, tokens ni el archivo `private/config.php`. El proyecto contiene datos de identificación del titular: mantener el repositorio privado.

Las imágenes de inspiración están identificadas como generadas. El logo fue facilitado por el cliente. PHPMailer conserva su licencia en `private/vendor/PHPMailer/LICENSE`.

