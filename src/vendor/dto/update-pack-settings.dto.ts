// src/vendor/dto/update-pack-settings.dto.ts
import { IsNumber, Max, Min } from 'class-validator';

export class UpdatePackSettingsDto {
  @IsNumber()
  @Max(15)
  @Min(1)
  limit: number;

  @IsNumber()
  @Min(0)
  price: number;
}
