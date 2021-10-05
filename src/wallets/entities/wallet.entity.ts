import { Transaction } from '../../payments/entities/transaction.entity';
// import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

// @Entity()
export class Wallet {
  // @PrimaryColumn()
  id: string;

  // @Column({ type: 'int', default: 0 })
  amount: number;

  // @OneToMany((type) => Transaction, (transaction) => transaction.wallet, {
  //   eager: true,
  // })
  transaction: string;
}
