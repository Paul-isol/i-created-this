import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts", // seed command npx prisma db seed
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
