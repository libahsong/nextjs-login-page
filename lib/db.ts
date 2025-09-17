import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

console.log(db);

export default db;
