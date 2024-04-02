import { InputType, PartialType } from '@nestjs/graphql';
import { CreateURLDto } from './create-url.dto';

@InputType()
export class UpdateURLDto extends PartialType(CreateURLDto) {}
