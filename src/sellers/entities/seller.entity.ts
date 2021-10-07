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
  // @PrimaryColumn()
  id: string;

  // @Column()
  name: string;

  // @Column()
  email: string;

  // @Column()
  password: string;

  // @OneToOne(() => Wallet, { eager: true })
  // @JoinColumn()
  wallet: Wallet;

  // @OneToMany((type) => Payment, (payment) => payment.seller)
  payments: Payment[];

  // @Column({ default: 'Seller' })
  type: string;

  // @CreateDateColumn()
  created_at: Date;
}
