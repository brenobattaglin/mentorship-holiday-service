import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HolidayResponseDto } from './dto/holiday-response.dto';
import { HolidaysService } from './holidays.service';

@ApiTags('holidays')
@Controller('holidays')
export class HolidaysController {
  constructor(private readonly holidaysService: HolidaysService) {}

  @Get('brazil')
  @ApiOperation({ summary: 'Get public holidays for Brazil this year' })
  @ApiOkResponse({ type: HolidayResponseDto, isArray: true })
  getBrazilHolidays(): Promise<HolidayResponseDto[]> {
    return this.holidaysService.getBrazilHolidays();
  }

  @Get('brazil/upcoming')
  @ApiOperation({ summary: 'Get upcoming public holidays for Brazil' })
  @ApiOkResponse({ type: HolidayResponseDto, isArray: true })
  getUpcomingBrazilHolidays(): Promise<HolidayResponseDto[]> {
    return this.holidaysService.getUpcomingBrazilHolidays();
  }
}
