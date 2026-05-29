<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require __DIR__ . "/../vendor/autoload.php";

use App\Config\DB;

try {
  $pdo = DB::conn();
  header("Content-Type: text/plain; charset=utf-8");
  echo "OK conectou.\n";
  echo "MySQL version: " . $pdo->query("select version()")->fetchColumn() . "\n";
} catch (Throwable $e) {
  http_response_code(500);
  header("Content-Type: text/plain; charset=utf-8");
  echo "ERRO: " . $e->getMessage() . "\n";
}