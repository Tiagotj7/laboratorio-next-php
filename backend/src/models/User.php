<?php
namespace App\Models;

use PDO;
use App\Config\DB;

class User {
  public static function findByEmail(string $email): ?array {
    $pdo = DB::conn();
    $st = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $st->execute([$email]);
    $u = $st->fetch(PDO::FETCH_ASSOC);
    return $u ?: null;
  }

  public static function create(string $name, string $email, string $password): int {
    $pdo = DB::conn();
    $hash = password_hash($password, PASSWORD_BCRYPT);
    $st = $pdo->prepare("INSERT INTO users (name,email,password_hash) VALUES (?,?,?)");
    $st->execute([$name, $email, $hash]);
    return (int)$pdo->lastInsertId();
  }
}