import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCvDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
