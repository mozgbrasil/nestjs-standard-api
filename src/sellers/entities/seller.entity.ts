// import {
//   Column,
//   CreateDateColumn,
//   Entity,
//   JoinColumn,
//   OneToMany,
//   OneToOne,
//   PrimaryColumn,
// } from 'typeorm';
import { Wallet } from '../../wallets/entities/wallet.entity';
import { Payment } from '../../payments/entities/payment.entity';

export class Seller {
  name: string;

  email: string;

  password: string;

  type: string;

  created_at: Date;
}
