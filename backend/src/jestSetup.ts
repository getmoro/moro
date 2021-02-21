import { prisma } from './server/prisma';

beforeAll(() => prisma.$connect());
afterAll(() => prisma.$disconnect());
