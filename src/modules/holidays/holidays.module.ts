import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HolidaysAdapter } from './holidays.adapter';
import { HolidaysController } from './holidays.controller';
import { HolidaysService } from './holidays.service';

@Module({
  imports: [HttpModule],
  controllers: [HolidaysController],
  providers: [HolidaysService, HolidaysAdapter],
})
export class HolidaysModule {}
