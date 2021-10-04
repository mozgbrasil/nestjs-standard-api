export class Customer {
  // @PrimaryColumn()
  id: string;

  // @Column()
  name: string;

  // @Column()
  email: string;

  // @Column()
  password: string;

  // @OneToMany((type) => Payment, (payment) => payment.customer)
  // payments: Payment[];

  // @Column({ default: 'Customer' })
  accountType: string;

  // @CreateDateColumn()
  created_at: Date;
}
