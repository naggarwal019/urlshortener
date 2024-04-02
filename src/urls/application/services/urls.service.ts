import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UrlsRepositoryDomain } from '../../domain/repository/urls.repository.domain';
import { CreateURLDto } from '../../domain/dto/create-url.dto';
import { nanoid } from 'nanoid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UrlsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly urlsRepository: UrlsRepositoryDomain,
  ) {}

  async shortenUrl(data: CreateURLDto) {
    const { longUrl } = data;

    const urlCode = nanoid(10);
    const baseURL =
      this.configService.get<string>('BASE_URL') || 'http://short.url';

    const [url, err] = await this.urlsRepository.findOne({
      query: { longUrl },
    });

    if (err) throw new InternalServerErrorException(err);

    if (url) return url.shortUrl;

    const shortUrl = `${baseURL}/${urlCode}`;

    const [newUrl, createErr] = await this.urlsRepository.create({
      urlCode,
      longUrl,
      shortUrl,
    });

    if (createErr) throw new InternalServerErrorException(createErr);

    return newUrl.shortUrl;
  }

  async findUrl(url: string) {
    const code = url.split('/')[3];
    const [foundUrl, err] = await this.urlsRepository.findOne({
      query: { urlCode: code },
    });

    if (err) throw new InternalServerErrorException(err);

    if (!foundUrl) throw new NotFoundException('Url not found');

    return foundUrl.longUrl;
  }
}
