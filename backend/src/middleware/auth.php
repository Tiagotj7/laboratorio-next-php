<?php
namespace App\Middleware;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use App\Config\JWTConfig;

function requireAuth(): array {
  $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
  if (!preg_match('/Bearer\s(\S+)/', $auth, $m)) {
    http_response_code(401);
    echo json_encode(["error" => "Missing token"]);
    exit;
  }

  try {
    $decoded = JWT::decode($m[1], new Key(JWTConfig::secret(), 'HS256'));
    return (array)$decoded;
  } catch (\Throwable $e) {
    http_response_code(401);
    echo json_encode(["error" => "Invalid token"]);
    exit;
  }
}