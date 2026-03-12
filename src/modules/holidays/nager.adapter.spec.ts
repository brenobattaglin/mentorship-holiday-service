import { HttpService } from '@nestjs/axios';
import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';
import { of, throwError } from 'rxjs';
import { NagerHolidayDto } from './dto/nager-holiday.dto';
import { HolidaysAdapter } from './nager.adapter';

const mockHolidays: NagerHolidayDto[] = [
  {
    date: '2025-01-01',
    localName: 'Confraternização Universal',
    name: "New Year's Day",
    countryCode: 'BR',
    fixed: true,
    global: true,
    types: ['Public'],
  },
  {
    date: '2025-04-21',
    localName: 'Tiradentes',
    name: 'Tiradentes',
    countryCode: 'BR',
    fixed: true,
    global: true,
    types: ['Public'],
  },
];

const mockAxiosResponse = (data: NagerHolidayDto[]): AxiosResponse => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: { headers: new AxiosHeaders() } as InternalAxiosRequestConfig,
});

describe('HolidaysAdapter', () => {
  let adapter: HolidaysAdapter;
  let httpService: jest.Mocked<HttpService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HolidaysAdapter,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    adapter = module.get<HolidaysAdapter>(HolidaysAdapter);
    httpService = module.get(HttpService);

    process.env.NAGER_API_URL = 'https://date.nager.at/api/v3';
  });

  it('should be defined', () => {
    expect(adapter).toBeDefined();
  });

  describe('getPublicHolidays', () => {
    it('should return holidays for the given year and country code', async () => {
      httpService.get.mockReturnValue(of(mockAxiosResponse(mockHolidays)));
      const spy = jest.spyOn(httpService, 'get');

      const result = await adapter.getPublicHolidays(2025, 'BR');

      expect(spy).toHaveBeenCalledWith(
        'https://date.nager.at/api/v3/PublicHolidays/2025/BR',
      );
      expect(result).toEqual(mockHolidays);
    });

    it('should throw InternalServerErrorException when the HTTP call fails', async () => {
      httpService.get.mockReturnValue(
        throwError(() => new Error('Network error')),
      );

      await expect(adapter.getPublicHolidays(2025, 'BR')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
