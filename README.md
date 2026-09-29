# REFORBRAS — web de reformas en Valencia

Web responsive con servicios, carrusel, proyectos próximamente y contacto por WhatsApp, teléfono y correo.

## Actualizaciones automáticas

- `main`: código, contenido y recursos editables.
- `hostinger`: web lista para publicar, generada por GitHub Actions. No editar esta rama manualmente.

Cada cambio en `main` genera la versión de producción, comprueba los enlaces y actualiza `hostinger` si todo es correcto. Conecta Hostinger a **hostinger**, siguiendo [HOSTINGER.md](HOSTINGER.md).

## Desarrollo local

Node.js 22 recomendado. No requiere instalar dependencias JavaScript.

```sh
npm run build
npm run check
npm run preview
```

Vista previa: http://127.0.0.1:4173. Usa `site.config.json`.

```sh
npm run build:production
```

Genera `dist/` usando `site.release.json`, sin modificar la vista previa. Solo incluye los archivos publicables. El contacto funciona directamente mediante WhatsApp, teléfono y correo; no utiliza PHP ni SMTP.

## Edición

- `scripts/build.mjs`: contenido y estructura.
- `public/assets/`: imágenes, estilos y comportamiento.
- `site.release.json`: datos del sitio publicado.
- `INVESTIGACION-Y-SEO.md`: referencias y decisiones de diseño.

No subir contraseñas, tokens ni `private/config.php`. Las imágenes de inspiración están identificadas como generadas. El logo fue facilitado por el cliente. PHPMailer se conserva como recurso opcional con su licencia, pero no se despliega.
