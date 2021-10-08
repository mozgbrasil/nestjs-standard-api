import { Wallet } from '../../wallets/entities/wallet.entity';

export class Transaction {
  id: string;

  amount: number;

  orderId: string;

  walletId: string;
}
