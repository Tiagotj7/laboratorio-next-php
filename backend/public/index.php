<?php
namespace App\Controllers;

use App\Models\Product;
use function App\Utils\json;

class ProductController {
  public static function index() { json(["data" => Product::all()]); }

  public static function store() {
    $body = json_decode(file_get_contents('php://input'), true) ?? [];
    if (!($body['name'] ?? '')) json(["error" => "name required"], 422);

    $id = Product::create([
      "name" => $body["name"],
      "sku" => $body["sku"] ?? null,
      "quantity" => $body["quantity"] ?? 0,
      "price" => $body["price"] ?? 0
    ]);
    json(["id" => $id], 201);
  }

  public static function update(int $id) {
    $body = json_decode(file_get_contents('php://input'), true) ?? [];
    if (!($body['name'] ?? '')) json(["error" => "name required"], 422);

    Product::update($id, [
      "name" => $body["name"],
      "sku" => $body["sku"] ?? null,
      "quantity" => $body["quantity"] ?? 0,
      "price" => $body["price"] ?? 0
    ]);
    json(["ok" => true]);
  }

  public static function destroy(int $id) {
    Product::delete($id);
    json(["ok" => true]);
  }
}