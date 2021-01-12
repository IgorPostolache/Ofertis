export interface PaymentSub {
  id: number;
  name: string;
  starts: Date;
  ends: Date;
  period: string;
  price: number;
  renews: boolean;
  subscriptionId: string;
  customerId: string;
}
