import { ApiUserModule } from '@fresha/api/user';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CamelCaseNamingConvention } from '@automapper/core';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      autoLoadEntities: true,
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT, 10) || 3306,
      username: process.env.POSTGRES_USER || 'root',
      password: process.env.POSTGRES_PASSWORD || '123456',
      database: process.env.POSTGRES_DATABASE || 'fresha',
      synchronize: process.env.production ? false : true,
      dropSchema: !!process.env.DROP_DB,
      logging: true
    }),
    AutomapperModule.forRoot({
      options: [
        {
          name: 'MAPPER',
          pluginInitializer: classes,
          namingConventions: new CamelCaseNamingConvention()
        }
      ],
      singular: true
    }),
    ApiUserModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
