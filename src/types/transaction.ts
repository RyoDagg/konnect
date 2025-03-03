export type Transaction = {
  id: string;
  type: 'send' | 'request';
  amount: number;
  status: 'pending' | 'completed';
  createdAt: string;
  updatedAt: string;
  senderId: string;
  receiverId: string;
  WalletId: string;
};
