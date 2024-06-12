// prisma connect

import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  errorFormat: 'pretty',
});

const connectPrisma = async () => {
  try {
    await prisma.$connect();
    console.log('Success DB connection.');
  } catch (error) {
    console.error('Failed DB connection.', error);
    throw error;
  }
};

export {connectPrisma, PrismaClient}