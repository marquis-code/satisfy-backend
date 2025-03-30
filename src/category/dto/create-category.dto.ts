import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  //   @ApiProperty({ example: "Fast Food" })
  @IsNotEmpty()
  @IsString()
  name: string;
}
