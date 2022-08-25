import * as config from 'config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const TYPEORM_CONFIG: any = config.get('typeorm');

export = {
  ...TYPEORM_CONFIG,
  cli: {
    migrationsDir: 'src/migration',
  },
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/src/migration/*{.js,.ts}'],
  migrationsTableName: 'migrations',
  namingStrategy: new SnakeNamingStrategy(),
  seeds: ['./src/seeds/*.seed{.js,.ts}'],
};
