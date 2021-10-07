import { Payment } from '../../payments/entities/payment.entity';
// import {
//   Column,
//   CreateDateColumn,
//   Entity,
//   OneToMany,
//   PrimaryColumn,
// } from 'typeorm';

// @Entity()
export class User {
  // @PrimaryColumn()
  // id: string;

  // @Column()
  username: string;

  // @Column()
  email: string;

  // @Column()
  password: string;

  // @OneToMany((type) => Payment, (payment) => payment.customer)
  payments: Payment[];

  // @Column({ default: 'Customer' })
  type: string;

  // @CreateDateColumn()
  created_at: Date;
}
