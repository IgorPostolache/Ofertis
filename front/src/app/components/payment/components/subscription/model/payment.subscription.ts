export interface PaymentSub {
  id: number;
  name: string;
  starts: Date;
  ends: Date;
  renews: boolean;
  subscriptionId: string;
  customerId: string;
}
