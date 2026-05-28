<?php
namespace App\Config;

class JWTConfig {
  public static function secret(): string { return $_ENV['JWT_SECRET']; }
  public static function issuer(): string { return $_ENV['JWT_ISSUER']; }
}