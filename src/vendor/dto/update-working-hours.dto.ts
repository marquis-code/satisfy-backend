// src/vendor/dto/update-working-hours.dto.ts
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateWorkingHoursDto {
  @IsString()
  day: string; // e.g., "Monday"

  @IsOptional()
  @IsString()
  openingTime?: string; // e.g., "09:00"

  @IsOptional()
  @IsString()
  closingTime?: string; // e.g., "17:00"

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
