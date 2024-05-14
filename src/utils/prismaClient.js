import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

const prisma = prismaClientSingleton();

if (process.env.NODE_ENV !== "production") global.prismaGlobal = prisma;
export default prisma;