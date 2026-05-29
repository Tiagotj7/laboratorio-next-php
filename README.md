# Estrutura do Projeto — laboratorio-next-php

```bash
laboratorio-next-php-main/
├── app/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   └── SiteHeader.tsx
│   │   │   ├── lib/
│   │   │   │   └── api.ts
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── products/
│   │   │   │   ├── page.tsx
│   │   │   │   └── ProductDialog.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   │   └── ui/
│   │   │       ├── badge.tsx
│   │   │       ├── button.tsx
│   │   │       ├── card.tsx
│   │   │       ├── dialog.tsx
│   │   │       ├── dropdown-menu.tsx
│   │   │       ├── input.tsx
│   │   │       ├── label.tsx
│   │   │       ├── separator.tsx
│   │   │       ├── sonner.tsx
│   │   │       └── table.tsx
│   │   └── lib/
│   │       └── utils.ts
│   ├── .gitignore
│   ├── AGENTS.md
│   ├── CLAUDE.md
│   ├── components.json
│   ├── eslint.config.mjs
│   ├── next.config.ts
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── README.md
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── server/
│   ├── public/
│   │   └── index.php
│   ├── src/
│   │   ├── Config/
│   │   │   ├── DB.php
│   │   │   └── JWTConfig.php
│   │   ├── controllers/
│   │   │   ├── AuthController.php
│   │   │   └── ProductController.php
│   │   ├── middleware/
│   │   │   └── auth.php
│   │   ├── models/
│   │   │   ├── Product.php
│   │   │   └── User.php
│   │   └── Utils/
│   │       └── Response.php
│   ├── composer.json
│   ├── composer.lock
│   ├── database.sql
│   └── package-lock.json
├── README.md
└── tree.md
```

## Stack Utilizada

### Frontend

* Next.js
* React
* TypeScript
* TailwindCSS
* shadcn/ui

### Backend

* PHP
* JWT Authentication
* MySQL
* Composer

## Organização

### `/app`

Aplicação frontend construída com Next.js.

### `/server`

API backend em PHP responsável por:

* autenticação
* gerenciamento de produtos
* middleware JWT
* conexão com banco de dados

## Funcionalidades Encontradas

* Login
* Registro de usuário
* CRUD de produtos
* Autenticação JWT
* Integração frontend + backend
