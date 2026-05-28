<?php
namespace App\Models;

use PDO;
use App\Config\DB;

class Product {
  public static function all(): array {
    $pdo = DB::conn();
    return $pdo->query("SELECT * FROM products ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);
  }

  public static function create(array $data): int {
    $pdo = DB::conn();
    $st = $pdo->prepare("INSERT INTO products (name, sku, quantity, price) VALUES (?,?,?,?)");
    $st->execute([$data['name'], $data['sku'] ?? null, (int)$data['quantity'], (float)$data['price']]);
    return (int)$pdo->lastInsertId();
  }

  public static function update(int $id, array $data): void {
    $pdo = DB::conn();
    $st = $pdo->prepare("UPDATE products SET name=?, sku=?, quantity=?, price=? WHERE id=?");
    $st->execute([$data['name'], $data['sku'] ?? null, (int)$data['quantity'], (float)$data['price'], $id]);
  }

  public static function delete(int $id): void {
    $pdo = DB::conn();
    $st = $pdo->prepare("DELETE FROM products WHERE id=?");
    $st->execute([$id]);
  }
}