<?php
require __DIR__ . "/../vendor/autoload.php";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use App\Controllers\AuthController;
use App\Controllers\ProductController;
use App\Middleware\Auth;
use App\Utils\Response;

// CORS (dev)
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") exit;

$method = $_SERVER["REQUEST_METHOD"];
$path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);

function body(): array {
  $raw = file_get_contents("php://input");
  $data = json_decode($raw, true);
  return is_array($data) ? $data : [];
}

// Rotas
try {
  // Health
  if ($method === "GET" && $path === "/") {
    Response::json(["ok" => true, "service" => "laboratorio-api"]);
  }

  // Auth
  if ($method === "POST" && $path === "/auth/register") AuthController::register(body());
  if ($method === "POST" && $path === "/auth/login") AuthController::login(body());
  if ($method === "GET"  && $path === "/auth/me") {
    $payload = Auth::requireAuth();
    AuthController::me($payload);
  }

  // Products (protegido)
  if ($path === "/products" && $method === "GET") {
    Auth::requireAuth();
    ProductController::index();
  }
  if ($path === "/products" && $method === "POST") {
    Auth::requireAuth();
    ProductController::store(body());
  }

  if (preg_match("#^/products/(\d+)$#", $path, $m)) {
    Auth::requireAuth();
    $id = (int)$m[1];

    if ($method === "GET") ProductController::show($id);
    if ($method === "PUT") ProductController::update($id, body());
    if ($method === "DELETE") ProductController::destroy($id);
  }

  Response::json(["error" => "Rota não encontrada"], 404);

} catch (Throwable $e) {
  Response::json(["error" => "Erro interno", "details" => $e->getMessage()], 500);
}