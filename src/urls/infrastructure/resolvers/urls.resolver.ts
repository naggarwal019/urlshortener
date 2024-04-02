import { Query, Mutation, Args } from '@nestjs/graphql';
import { UrlsService } from '../../application/services/urls.service';
import { CreateURLDto } from '../../domain/dto/create-url.dto';
import { Inject } from '@nestjs/common';

export class UrlsResolver {
  constructor(@Inject(UrlsService) private readonly service: UrlsService) {}

  @Query(() => String)
  async findToRedirect(@Args('url') url: string) {
    return await this.service.findUrl(url);
  }

  @Mutation(() => String)
  async shortenUrl(@Args('data') data: CreateURLDto) {
    return await this.service.shortenUrl(data);
  }
}
