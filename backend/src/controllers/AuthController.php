<?php
namespace App\Controllers;

use App\Models\User;
use Firebase\JWT\JWT;
use App\Config\JWTConfig;
use function App\Utils\json;

class AuthController {
  public static function register() {
    $body = json_decode(file_get_contents('php://input'), true) ?? [];
    $name = trim($body['name'] ?? '');
    $email = trim($body['email'] ?? '');
    $password = $body['password'] ?? '';

    if (!$name || !$email || strlen($password) < 6) json(["error" => "Invalid data"], 422);
    if (User::findByEmail($email)) json(["error" => "Email already exists"], 409);

    $id = User::create($name, $email, $password);
    json(["id" => $id, "name" => $name, "email" => $email], 201);
  }

  public static function login() {
    $body = json_decode(file_get_contents('php://input'), true) ?? [];
    $email = trim($body['email'] ?? '');
    $password = $body['password'] ?? '';

    $u = User::findByEmail($email);
    if (!$u || !password_verify($password, $u['password_hash'])) json(["error" => "Invalid credentials"], 401);

    $now = time();
    $payload = [
      "iss" => JWTConfig::issuer(),
      "iat" => $now,
      "exp" => $now + (60 * 60 * 8),
      "sub" => (int)$u['id'],
      "email" => $u['email'],
      "name" => $u['name'],
    ];

    $token = JWT::encode($payload, JWTConfig::secret(), 'HS256');
    json(["token" => $token]);
  }

  public static function me(array $user) {
    json(["user" => $user]);
  }
}