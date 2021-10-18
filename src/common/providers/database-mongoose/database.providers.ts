import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'MONGOOSE_DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(process.env.MONGODB_URI),
  },
];
