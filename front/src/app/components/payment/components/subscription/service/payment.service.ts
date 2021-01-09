import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const PAYMENT_API = 'http://localhost:8080/api/payment/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PaymentSubscriptionService {
  constructor(private http: HttpClient) { }

  createSub(customer){
    return this.http.post(PAYMENT_API + "subscription/create", customer, httpOptions);
  }
  getSubs(customer){
    return this.http.post(PAYMENT_API + "subscription/list", customer, httpOptions);
  }
  cancelSub(subId){
    return this.http.post(PAYMENT_API + "subscription/cancel", subId, httpOptions);
  }
}
