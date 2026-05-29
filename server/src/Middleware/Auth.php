<?php
namespace App\Middleware;

use App\Config\JWTConfig;
use App\Utils\Response;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Auth {
  public static function requireAuth(): array {
    $headers = function_exists('getallheaders') ? getallheaders() : [];
    $auth = $headers["Authorization"] ?? ($headers["authorization"] ?? null);

    if (!$auth || strpos($auth, "Bearer ") !== 0) {
      Response::json(["error" => "Token ausente"], 401);
    }

    $token = trim(substr($auth, 7));

    try {
      $decoded = JWT::decode($token, new Key(JWTConfig::$secret, "HS256"));
      return (array)$decoded;
    } catch (\Throwable $e) {
      Response::json(["error" => "Token inválido"], 401);
    }
  }
}