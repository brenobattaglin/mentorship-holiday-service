import { Test, TestingModule } from '@nestjs/testing';
import { HolidayResponseDto } from './dto/holiday-response.dto';
import { NagerHolidayDto } from './dto/nager-holiday.dto';
import { HolidaysAdapter } from './holidays.adapter';
import { HolidaysService } from './holidays.service';

const mockNagerHolidays: NagerHolidayDto[] = [
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
    date: '2025-06-19',
    localName: 'Corpus Christi',
    name: 'Corpus Christi',
    countryCode: 'BR',
    fixed: false,
    global: true,
    types: ['Public'],
  },
  {
    date: '2025-12-25',
    localName: 'Natal',
    name: 'Christmas Day',
    countryCode: 'BR',
    fixed: true,
    global: true,
    types: ['Public'],
  },
];

describe('HolidaysService', () => {
  let service: HolidaysService;
  let adapter: jest.Mocked<HolidaysAdapter>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HolidaysService,
        {
          provide: HolidaysAdapter,
          useValue: {
            getPublicHolidays: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<HolidaysService>(HolidaysService);
    adapter = module.get(HolidaysAdapter);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getBrazilHolidays', () => {
    it('should return mapped HolidayResponseDto list', async () => {
      adapter.getPublicHolidays.mockResolvedValue(mockNagerHolidays);

      const result = await service.getBrazilHolidays();

      const expected: HolidayResponseDto[] = mockNagerHolidays.map((h) => ({
        date: h.date,
        name: h.name,
        localName: h.localName,
        types: h.types,
      }));

      expect(result).toEqual(expected);
    });

    it('should call the adapter with the current year and BR country code', async () => {
      adapter.getPublicHolidays.mockResolvedValue([]);
      const currentYear = new Date().getFullYear();

      await service.getBrazilHolidays();

      expect(adapter.getPublicHolidays).toHaveBeenCalledWith(currentYear, 'BR');
    });
  });

  describe('getUpcomingBrazilHolidays', () => {
    it('should filter out past holidays and include today', async () => {
      // Fix today to 2025-06-19 for deterministic results
      jest.useFakeTimers().setSystemTime(new Date('2025-06-19'));
      adapter.getPublicHolidays.mockResolvedValue(mockNagerHolidays);

      const result = await service.getUpcomingBrazilHolidays();

      expect(result.map((h) => h.date)).toEqual(['2025-06-19', '2025-12-25']);

      jest.useRealTimers();
    });

    it('should return an empty list when all holidays have passed', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2025-12-26'));
      adapter.getPublicHolidays.mockResolvedValue(mockNagerHolidays);

      const result = await service.getUpcomingBrazilHolidays();

      expect(result).toEqual([]);

      jest.useRealTimers();
    });
  });
});
