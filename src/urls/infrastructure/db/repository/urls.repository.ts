import { Injectable } from '@nestjs/common';
import { Prisma, Url } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from '../../../../prisma/prisma.service';
import { IReturn } from '../../../../shared/domain/types/return-type';
import { UrlsRepositoryDomain } from '../../../domain/repository/urls.repository.domain';
import { URLDomain } from '../../../domain/entity/url.domain';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UrlsRepository implements UrlsRepositoryDomain {
  private entity: Prisma.UrlDelegate<DefaultArgs>;

  constructor(private prisma: PrismaService) {
    this.entity = prisma.url;
  }

  private mapperEntityToDomain(entity: Url): URLDomain {
    return plainToInstance(URLDomain, entity);
  }

  async findAll(): Promise<IReturn<URLDomain[], Error>> {
    try {
      const result = await this.entity.findMany();

      const domain = result.map((user) => this.mapperEntityToDomain(user));

      return [domain, null];
    } catch (error) {
      return [null, error];
    }
  }

  async create(data: Partial<URLDomain>): Promise<IReturn<URLDomain, Error>> {
    try {
      const result = await this.entity.create({ data } as any);
      const domain = this.mapperEntityToDomain(result);
      return [domain, null];
    } catch (error) {
      return [null, error];
    }
  }

  async findById(id: number): Promise<IReturn<URLDomain, Error>> {
    try {
      const result = await this.entity.findUnique({ where: { id } });
      const domain = this.mapperEntityToDomain(result);

      return [domain, null];
    } catch (error) {
      return [null, error];
    }
  }

  async findOne(arg: {
    query: Record<string, any>;
  }): Promise<IReturn<URLDomain, Error>> {
    try {
      const result = await this.entity.findFirst({ where: arg.query });
      const domain = this.mapperEntityToDomain(result);

      return [domain, null];
    } catch (error) {
      return [null, error];
    }
  }

  async updateById(
    id: any,
    data: Partial<URLDomain>,
  ): Promise<IReturn<URLDomain, Error>> {
    try {
      const result = await this.entity.update({ where: { id }, data } as any);
      const domain = this.mapperEntityToDomain(result);

      return [domain, null];
    } catch (error) {
      return [null, error];
    }
  }

  async deleteById(id): Promise<IReturn<URLDomain, Error>> {
    try {
      const result = await this.entity.delete({ where: { id } });
      const domain = this.mapperEntityToDomain(result);

      return [domain, null];
    } catch (error) {
      return [null, error];
    }
  }
}
