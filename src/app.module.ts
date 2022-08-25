import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';

const TYPEORM_CONFIG: any = config.get('typeorm');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...TYPEORM_CONFIG,
      synchronize: process.env.NODE_ENV === 'development',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      // migrations: [__dirname + '/migration/*.migtation.{ts, js}'],
    }),
    ConfigModule.forRoot({
      envFilePath: ['config/default.ts'],
    }),
    TasksModule,
    AuthModule,
    ConfigModule,
  ],
})
export class AppModule {}
