# Conectar Hostinger con GitHub

## Primera conexión

1. En Hostinger, abre la gestión del alojamiento HTML/PHP del dominio refobras.es y su apartado Git.
2. Conecta tu cuenta de GitHub y selecciona `Angelolozano-7/Refobras`.
3. Selecciona la rama **hostinger**, no main.
4. Usa la carpeta pública del dominio, normalmente `public_html`, como destino. La rama ya tiene index.html en la raíz; no necesita un comando de compilación.
5. Activa los despliegues automáticos. Revisa el dominio y el destino antes de confirmar el primer despliegue.

Si el destino contiene otra web, guarda antes una copia de seguridad. La conexión y el primer despliegue se realizan en Hostinger; preparar el repositorio no publica el dominio.

## Actualizaciones

Edita el contenido en main. En la pestaña Actions, el flujo «Preparar web para Hostinger» genera y comprueba la web. Solo si pasa las comprobaciones actualiza hostinger. Hostinger recoge los cambios de esa rama cuando su integración está conectada y activada.

No edites hostinger a mano: la siguiente generación sustituye su contenido. Para deshacer un cambio, revierte el cambio correspondiente en main. También puedes repetir la generación desde Actions → Preparar web para Hostinger → Run workflow, seleccionando main.

## Qué se publica

HTML, imágenes optimizadas, CSS, JavaScript, sitemap, robots.txt y .htaccess. Sin fuentes, configuración privada, dependencias PHP ni avisos de vista previa. Proyectos permanece como «Próximamente». WhatsApp apunta a +34 613 503 677.

## Comprobación tras publicar

Comprueba https://www.refobras.es, las páginas interiores, el menú móvil y los botones de WhatsApp, teléfono y correo. Verifica que Hostinger tenga el certificado SSL activo y que el dominio sin www redirija al dominio elegido con www.

Documentación oficial: https://www.hostinger.com/support/1583302-how-to-deploy-a-git-repository-in-hostinger/
