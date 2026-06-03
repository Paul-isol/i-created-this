npm install better-auth

Set Environment Variables

Create A Better Auth Instance
lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import db from "./db";
// If your Prisma file is located elsewhere, you can change the path

export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: "postgresql",
    }),
});
Configure Database

npm install @better-auth/prisma-adapter

create api
api/auth/[...all]/route.ts

npx prisma generate

npx auth@latest generate

npx prisma migrate dev