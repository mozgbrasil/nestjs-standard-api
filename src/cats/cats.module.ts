import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
// import { DatabaseMongooseModule } from 'src/common/providers/database-mongoose/database.module';
import { catsProviders } from './cats.providers';
import { DatabaseTypeOrmModule } from 'src/common/providers/database-typeorm/database.module';

@Module({
  imports: [
    // DatabaseMongooseModule,
    DatabaseTypeOrmModule,
  ],
  controllers: [CatsController],
  providers: [CatsService, ...catsProviders],
})
export class CatsModule {}
