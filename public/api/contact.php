<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
function reply(int $status, array $data): never {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    reply(405, ['error' => 'Método no permitido.']);
}
$private = dirname(__DIR__, 2) . '/reforbras-private';
$configFile = $private . '/config.php';
if (!is_file($configFile)) reply(503, ['error' => 'El formulario aún no está disponible. Utiliza otro canal de contacto.']);
$config = require $configFile;
if (empty($config['enabled'])) reply(503, ['error' => 'El envío no está activado. No se ha enviado tu consulta.']);
if (($_SERVER['HTTP_ORIGIN'] ?? '') !== rtrim($config['origin'] ?? '', '/')) reply(403, ['error' => 'Origen no autorizado.']);
if (!str_starts_with(strtolower($_SERVER['CONTENT_TYPE'] ?? ''), 'application/json')) reply(415, ['error' => 'Formato no admitido.']);
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 16000) reply(413, ['error' => 'La solicitud es demasiado extensa.']);
$raw = file_get_contents('php://input', false, null, 0, 16001);
if ($raw === false || strlen($raw) > 16000) reply(413, ['error' => 'La solicitud es demasiado extensa.']);
$data = json_decode($raw, true);
if (!is_array($data)) reply(400, ['error' => 'Solicitud no válida.']);
foreach (['name','phone','email','city','service','message','consent','website'] as $key) {
    if (isset($data[$key]) && !is_string($data[$key])) reply(422, ['error' => 'Revisa los campos del formulario.']);
    $data[$key] = trim($data[$key] ?? '');
}
if ($data['website'] !== '') reply(422, ['error' => 'No se ha podido validar la solicitud.']);
if (strlen($data['name']) < 2 || strlen($data['name']) > 300 ||
    !preg_match('/^[+0-9() .-]{9,25}$/', $data['phone']) ||
    !filter_var($data['email'], FILTER_VALIDATE_EMAIL) || strlen($data['email']) > 254 ||
    strlen($data['city']) < 2 || strlen($data['city']) > 300 ||
    !in_array($data['service'], ['Reformas integrales','Cocinas','Baños','Locales y espacios','Otra consulta'], true) ||
    strlen($data['message']) < 15 || strlen($data['message']) > 12000 || $data['consent'] !== 'yes') {
    reply(422, ['error' => 'Revisa los campos obligatorios y la política de privacidad.']);
}
if (strlen($config['rate_secret'] ?? '') < 32) reply(503, ['error' => 'El formulario no está disponible temporalmente.']);
// Límite con bloqueo exclusivo. Solo conserva hashes y contadores, nunca mensajes ni IP en claro.
$rateDir = $private . '/rate';
if (!is_dir($rateDir) && !mkdir($rateDir, 0700, true)) reply(503, ['error' => 'No se ha podido procesar la solicitud.']);
$handle = fopen($rateDir . '/requests.json', 'c+');
if (!$handle || !flock($handle, LOCK_EX)) reply(503, ['error' => 'Inténtalo de nuevo más tarde.']);
$now = time();
$rates = json_decode(stream_get_contents($handle), true) ?: [];
foreach ($rates as $key => $record) if (($record['time'] ?? 0) < $now - 3600) unset($rates[$key]);
$ipKey = hash_hmac('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown', $config['rate_secret']);
if (($rates[$ipKey]['count'] ?? 0) >= 5 || ($rates['global']['count'] ?? 0) >= 40) {
    flock($handle, LOCK_UN); fclose($handle);
    header('Retry-After: 3600');
    reply(429, ['error' => 'Se ha alcanzado el límite temporal de consultas. Inténtalo más tarde o llama por teléfono.']);
}
foreach ([$ipKey, 'global'] as $key) $rates[$key] = ['time' => $rates[$key]['time'] ?? $now, 'count' => ($rates[$key]['count'] ?? 0) + 1];
rewind($handle); ftruncate($handle, 0); fwrite($handle, json_encode($rates)); fflush($handle); flock($handle, LOCK_UN); fclose($handle);
try {
    require $private . '/vendor/PHPMailer/Exception.php';
    require $private . '/vendor/PHPMailer/PHPMailer.php';
    require $private . '/vendor/PHPMailer/SMTP.php';
    $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $config['smtp_host'];
    $mail->Port = (int)$config['smtp_port'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['smtp_user'];
    $mail->Password = $config['smtp_password'];
    $mail->SMTPSecure = $config['smtp_security'];
    $mail->Timeout = 15;
    $mail->CharSet = 'UTF-8';
    $mail->setFrom($config['from_email'], 'REFORBRAS Web');
    $mail->addAddress($config['to_email']);
    $mail->addReplyTo($data['email'], preg_replace('/[\r\n]+/', ' ', $data['name']));
    $mail->Subject = 'Nueva consulta de reforma desde la web';
    $mail->Body = "Nombre: {$data['name']}\nTeléfono: {$data['phone']}\nCorreo: {$data['email']}\nLocalidad: {$data['city']}\nServicio: {$data['service']}\n\n{$data['message']}\n\nInformación de privacidad aceptada: " . gmdate('c');
    $mail->send();
    reply(200, ['message' => 'Tu consulta se ha enviado al correo de REFORBRAS. Gracias por contarnos tu idea.']);
} catch (\Throwable $error) {
    // No revelar credenciales, mensajes ni diagnósticos SMTP al navegador.
    reply(502, ['error' => 'No se ha podido enviar la consulta. Inténtalo más tarde o utiliza el teléfono o WhatsApp.']);
}
