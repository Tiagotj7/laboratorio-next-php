<?php
namespace App\Config;

use PDO;

class DB {
  public static function conn(): PDO {
    $host = "127.0.0.1";
    $db   = "laboratorio";
    $user = "root";
    $pass = "";
    $charset = "utf8mb4";

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $pdo = new PDO($dsn, $user, $pass, [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    return $pdo;
  }
}