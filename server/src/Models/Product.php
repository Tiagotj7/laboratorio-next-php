<?php
namespace App\Models;

use App\Config\DB;

class Product {
  public static function all(): array {
    $pdo = DB::conn();
    return $pdo->query("SELECT * FROM products ORDER BY id DESC")->fetchAll();
  }

  public static function find(int $id): ?array {
    $pdo = DB::conn();
    $st = $pdo->prepare("SELECT * FROM products WHERE id = ?");
    $st->execute([$id]);
    $p = $st->fetch();
    return $p ?: null;
  }

  public static function create(array $data): int {
    $pdo = DB::conn();
    $st = $pdo->prepare("INSERT INTO products (name, sku, quantity, price) VALUES (?, ?, ?, ?)");
    $st->execute([
      $data["name"],
      $data["sku"] ?? null,
      (int)($data["quantity"] ?? 0),
      (float)($data["price"] ?? 0)
    ]);
    return (int)$pdo->lastInsertId();
  }

  public static function update(int $id, array $data): bool {
    $pdo = DB::conn();
    $st = $pdo->prepare("UPDATE products SET name=?, sku=?, quantity=?, price=? WHERE id=?");
    return $st->execute([
      $data["name"],
      $data["sku"] ?? null,
      (int)($data["quantity"] ?? 0),
      (float)($data["price"] ?? 0),
      $id
    ]);
  }

  public static function delete(int $id): bool {
    $pdo = DB::conn();
    $st = $pdo->prepare("DELETE FROM products WHERE id = ?");
    return $st->execute([$id]);
  }
}