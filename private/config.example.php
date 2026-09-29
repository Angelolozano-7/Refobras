<?php
// Guardar como reforbras-private/config.php, FUERA de public_html.
return [
    'enabled' => false,
    'origin' => 'https://www.refobras.es',
    'smtp_host' => '', // Datos exactos del proveedor de correo.
    'smtp_port' => 465,
    'smtp_security' => 'ssl', // ssl (465) o tls (587).
    'smtp_user' => '',
    'smtp_password' => '',
    'from_email' => '', // Remitente autenticado del dominio.
    'to_email' => 'refobras.es@gmail.com', // Buzón que recibe las consultas.
    'rate_secret' => '', // 32+ caracteres aleatorios, fuera del directorio público.
];
