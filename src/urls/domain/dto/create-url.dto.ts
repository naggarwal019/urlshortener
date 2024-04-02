import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

@InputType()
export class CreateURLDto {
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  longUrl: string;
}
