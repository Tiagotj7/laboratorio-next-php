<?php
namespace App\Controllers;

use App\Models\Product;
use App\Utils\Response;

class ProductController {
  public static function index(): void {
    Response::json(["products" => Product::all()]);
  }

  public static function show(int $id): void {
    $p = Product::find($id);
    if (!$p) Response::json(["error" => "Produto não encontrado"], 404);
    Response::json(["product" => $p]);
  }

  public static function store(array $body): void {
    $name = trim($body["name"] ?? "");
    if (!$name) Response::json(["error" => "Campo obrigatório: name"], 422);

    $id = Product::create($body);
    Response::json(["message" => "Criado", "product" => Product::find($id)], 201);
  }

  public static function update(int $id, array $body): void {
    if (!Product::find($id)) Response::json(["error" => "Produto não encontrado"], 404);
    $name = trim($body["name"] ?? "");
    if (!$name) Response::json(["error" => "Campo obrigatório: name"], 422);

    Product::update($id, $body);
    Response::json(["message" => "Atualizado", "product" => Product::find($id)]);
  }

  public static function destroy(int $id): void {
    if (!Product::find($id)) Response::json(["error" => "Produto não encontrado"], 404);
    Product::delete($id);
    Response::json(["message" => "Removido"]);
  }
}