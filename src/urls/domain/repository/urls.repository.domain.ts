import { IReturn } from '../../../shared/domain/types/return-type';
import { URLDomain } from '../entity/url.domain';

export abstract class UrlsRepositoryDomain {
  abstract create(data: Partial<URLDomain>): Promise<IReturn<URLDomain, Error>>;
  abstract findAll(): Promise<IReturn<URLDomain[], Error>>;
  abstract findById(id: number): Promise<IReturn<URLDomain, Error>>;
  abstract findOne(arg: {
    query: Record<string, any>;
  }): Promise<IReturn<URLDomain, Error>>;
  abstract updateById(
    id: number,
    data: Partial<URLDomain>,
  ): Promise<IReturn<URLDomain, Error>>;
  abstract deleteById(id: number): Promise<IReturn<URLDomain, Error>>;
}
