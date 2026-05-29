<?php
namespace App\Controllers;

use App\Config\JWTConfig;
use App\Models\User;
use App\Utils\Response;
use Firebase\JWT\JWT;

class AuthController {

  public static function register(array $body): void {
    $name = trim($body["name"] ?? "");
    $email = trim($body["email"] ?? "");
    $password = $body["password"] ?? "";

    if (!$name || !$email || !$password) {
      Response::json(["error" => "Campos obrigatórios: name, email, password"], 422);
    }

    if (User::findByEmail($email)) {
      Response::json(["error" => "Email já cadastrado"], 409);
    }

    $id = User::create($name, $email, $password);
    $user = User::findById($id);

    Response::json(["message" => "Usuário criado", "user" => $user], 201);
  }

  public static function login(array $body): void {
    $email = trim($body["email"] ?? "");
    $password = $body["password"] ?? "";

    if (!$email || !$password) {
      Response::json(["error" => "Campos obrigatórios: email, password"], 422);
    }

    $user = User::findByEmail($email);
    if (!$user || !password_verify($password, $user["password_hash"])) {
      Response::json(["error" => "Credenciais inválidas"], 401);
    }

    $now = time();
    $payload = [
      "iss" => JWTConfig::$issuer,
      "iat" => $now,
      "exp" => $now + JWTConfig::$ttlSeconds,
      "sub" => (int)$user["id"],
      "email" => $user["email"]
    ];

    $token = JWT::encode($payload, JWTConfig::$secret, "HS256");

    Response::json([
      "token" => $token,
      "user" => [
        "id" => (int)$user["id"],
        "name" => $user["name"],
        "email" => $user["email"]
      ]
    ]);
  }

  public static function me(array $authPayload): void {
    $userId = (int)($authPayload["sub"] ?? 0);
    $user = User::findById($userId);
    if (!$user) Response::json(["error" => "Usuário não encontrado"], 404);
    Response::json(["user" => $user]);
  }
}