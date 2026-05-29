<?php
namespace App\Config;

class JWTConfig {
  public static string $secret = "SUA_CHAVE_SUPER_SECRETA_TROQUE_AQUI";
  public static string $issuer = "laboratorio-api";
  public static int $ttlSeconds = 60 * 60 * 6; // 6 horas
}