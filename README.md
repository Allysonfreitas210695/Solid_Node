## 1️⃣ Inicializar o Prisma no projeto

    npx prisma init

## 2️⃣ Instalar o Prisma Client

    npm install @prisma/client

## 3️⃣ Criar e aplicar migrações

    npx prisma migrate dev --name init

## 4️⃣ Gerar os tipos do Prisma Client

    npx prisma generate

### 💡 Dica: Sempre rode npx prisma generate depois de alterar o schema.prisma para atualizar os tipos.

## Visualizar dados e modelos

    npx prisma studio
