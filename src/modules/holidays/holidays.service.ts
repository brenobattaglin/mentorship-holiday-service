import { Injectable } from '@nestjs/common';
import { HolidaysAdapter } from './nager.adapter';
import { HolidayResponseDto } from './dto/holiday-response.dto';

@Injectable()
export class HolidaysService {
  constructor(private readonly holidaysAdapter: HolidaysAdapter) {}

  async getBrazilHolidays(): Promise<HolidayResponseDto[]> {
    const year = new Date().getFullYear();
    const holidays = await this.holidaysAdapter.getPublicHolidays(year, 'BR');

    return holidays.map((h) => ({
      date: h.date,
      name: h.name,
      localName: h.localName,
      types: h.types,
    }));
  }

  async getUpcomingBrazilHolidays(): Promise<HolidayResponseDto[]> {
    const holidays = await this.getBrazilHolidays();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return holidays.filter((h) => new Date(h.date) >= today);
  }
}
