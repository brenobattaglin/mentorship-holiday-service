import { Module } from '@nestjs/common';
import { HolidaysModule } from './modules/holidays/holidays.module';

@Module({
  imports: [HolidaysModule],
})
export class AppModule {}
