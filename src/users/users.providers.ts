import { Mongoose } from 'mongoose';
import { UserSchema } from './interfaces/user.schema';

export const usersProviders = [
  {
    provide: 'CAT_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Cat', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
