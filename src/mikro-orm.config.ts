import { MikroOrmModuleOptions as Options } from '@mikro-orm/nestjs';

const config: Options = {
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  type: 'mysql',
  dbName: 'trubbi',
  user: 'root',
  password: 'trubbi',
  host: 'trubbi-mariadb',
  port: 3306,
  migrations: {
    path: 'dist/migrations',
    pathTs: 'migrations',
  },
};

export default config;