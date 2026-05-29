<?php
namespace App\Models;

use App\Config\DB;
use PDO;

class User {
  public static function findByEmail(string $email): ?array {
    $pdo = DB::conn();
    $st = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $st->execute([$email]);
    $u = $st->fetch();
    return $u ?: null;
  }

  public static function create(string $name, string $email, string $password): int {
    $pdo = DB::conn();
    $hash = password_hash($password, PASSWORD_BCRYPT);

    $st = $pdo->prepare("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)");
    $st->execute([$name, $email, $hash]);
    return (int)$pdo->lastInsertId();
  }

  public static function findById(int $id): ?array {
    $pdo = DB::conn();
    $st = $pdo->prepare("SELECT id, name, email, created_at FROM users WHERE id = ?");
    $st->execute([$id]);
    $u = $st->fetch();
    return $u ?: null;
  }
}