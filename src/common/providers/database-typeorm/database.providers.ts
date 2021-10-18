import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'TYPEORM_DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'db_user',
        password: 'db_pass',
        database: 'db_mjv',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
  },
];
