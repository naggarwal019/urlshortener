import { Exclude, Expose, Type } from 'class-transformer';
import { initProp } from '../../../shared/domain/helpers/init-prop';

export interface IURLDomain {
  id?: string;
  urlCode: string;
  longUrl: string;
  shortUrl: string;
}

@Exclude()
export class URLDomain implements IURLDomain {
  @Expose()
  @Type(() => String)
  id: string;

  @Expose()
  urlCode: string;

  @Expose()
  longUrl: string;

  @Expose()
  shortUrl: string;

  constructor(arg?: Partial<URLDomain>) {
    this.id = initProp(arg?.id);
    this.urlCode = initProp(arg?.urlCode);
    this.longUrl = initProp(arg?.longUrl);
    this.shortUrl = initProp(arg?.shortUrl);
  }
}
