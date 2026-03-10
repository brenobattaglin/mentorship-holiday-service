import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { NagerHolidayDto } from './dto/nager-holiday.dto';

@Injectable()
export class HolidaysAdapter {
  private readonly logger = new Logger(HolidaysAdapter.name);
  private readonly baseUrl = process.env.NAGER_API_URL;

  constructor(private readonly httpService: HttpService) {}

  async getPublicHolidays(
    year: number,
    countryCode: string,
  ): Promise<NagerHolidayDto[]> {
    const url = `${this.baseUrl}/PublicHolidays/${year}/${countryCode}`;

    try {
      const { data } = await firstValueFrom(
        this.httpService.get<NagerHolidayDto[]>(url),
      );
      return data;
    } catch (error) {
      this.logger.error(
        `Failed to fetch public holidays for ${countryCode}/${year}`,
        error,
      );
      throw new InternalServerErrorException(
        'Failed to fetch public holidays from Nager.Date API',
      );
    }
  }
}
