import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UrlsService } from './application/services/urls.service';
import { UrlsRepositoryDomain } from './domain/repository/urls.repository.domain';
import { UrlsRepository } from './infrastructure/db/repository/urls.repository';
import { UrlsResolver } from './infrastructure/resolvers/urls.resolver';

@Module({
  imports: [PrismaModule],
  providers: [
    UrlsResolver,
    UrlsService,
    {
      provide: UrlsRepositoryDomain,
      useClass: UrlsRepository,
    },
  ],
  exports: [
    UrlsResolver,
    UrlsService,
    {
      provide: UrlsRepositoryDomain,
      useClass: UrlsRepository,
    },
  ],
})
export class UrlsModule {}
