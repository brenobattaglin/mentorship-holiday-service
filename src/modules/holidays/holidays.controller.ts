import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HolidaysService } from './holidays.service';

@ApiTags('holidays')
@Controller('holidays')
export class HolidaysController {
  constructor(private readonly holidaysService: HolidaysService) {}

  @Get('brazil')
  getBrazilHolidays() {}

  @Get('brazil/upcoming')
  getUpcomingBrazilHolidays() {}
}
