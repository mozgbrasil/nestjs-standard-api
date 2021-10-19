import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'TYPEORM_DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: process.env.TYPE_ORM_HOST,
        port: 3306,
        username: process.env.TYPE_ORM_USERNAME,
        password: process.env.TYPE_ORM_PASSWORD,
        database: process.env.TYPE_ORM_DATABASE,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
  },
];
