import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentSub } from '../model/payment.subscription';

const SUBSCRIPTION_API = 'http://localhost:8080/api/subscriptions/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PaymentSubscriptionService {
  constructor(private http: HttpClient) { }

  createSub(customer): Observable<PaymentSub>{
    return this.http.post<PaymentSub>(SUBSCRIPTION_API + "add", customer, httpOptions);
  }
  getUserSubs(): Observable<PaymentSub[]>{
    return this.http.get<PaymentSub[]>(SUBSCRIPTION_API);
  }
  cancelSub(subId): Observable<PaymentSub>{
    return this.http.post<PaymentSub>(SUBSCRIPTION_API + "delete", subId, httpOptions);
  }
  getTimeLeft(): Observable<string> {
    return this.http.get<string>(SUBSCRIPTION_API + "left");
  }
}
