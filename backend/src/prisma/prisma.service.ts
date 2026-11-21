import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      await this.$queryRaw`SELECT 1`; // vérifie que la base répond vraiment
      this.logger.log('✅ Connecté à PostgreSQL');
    } catch (error) {
      this.logger.error('❌ Connexion à PostgreSQL impossible', error);
      throw error; // arrête le démarrage si la base est injoignable
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}