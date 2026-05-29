laboratorio-next-php/
├── app/
│   ├── .gitignore
│   ├── AGENTS.md
│   ├── CLAUDE.md
│   ├── README.md
│   ├── eslint.config.mjs
│   ├── next.config.ts
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── tsconfig.json
│   └── src/
│       └── app/
│           ├── globals.css
│           ├── layout.tsx
│           ├── page.tsx
│           ├── lib/
│           │   └── api.ts
│           ├── login/
│           │   └── page.tsx
│           ├── products/
│           │   └── page.tsx
│           └── register/
│               └── page.tsx
│
├── server/
│   ├── composer.json
│   ├── public/
│   │   └── index.php
│   └── src/
│       ├── Config/
│       │   ├── DB.php
│       │   └── JWTConfig.php
│       ├── controllers/
│       │   ├── AuthController.php
│       │   └── ProductController.php
│       ├── middleware/
│       │   └── auth.php
│       ├── models/
│       │   ├── Product.php
│       │   └── User.php
│       └── Utils/
│           └── Response.php
│
└── README.md