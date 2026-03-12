import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { HolidaysAdapter } from './nager.adapter';
import { HolidaysController } from './holidays.controller';
import { HolidaysService } from './holidays.service';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: 60 * 60 * 1000, // 1 hour in milliseconds
    }),
  ],
  controllers: [HolidaysController],
  providers: [HolidaysService, HolidaysAdapter],
})
export class HolidaysModule {}
