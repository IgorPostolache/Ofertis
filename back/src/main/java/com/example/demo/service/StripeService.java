package com.example.demo.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.model.Customer;
import com.stripe.model.Subscription;
import com.stripe.model.SubscriptionCollection;

import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@NoArgsConstructor
@Slf4j
public class StripeService {
	@Value("${stripe.keys.secret}")
	private String API_SK;
	
	public String createCustomer(String email, String token) {
		String id = null;
		try {
			Stripe.apiKey = API_SK;
			
			Map<String, Object> customerParams = new HashMap<>();
			
			customerParams.put("description", "Customer for " + email);
			customerParams.put("source", token);
			
			Customer customer = Customer.create(customerParams);
			
			id = customer.getId();
		} catch (Exception ex) {
			log.error("Could not create a customer: {}",ex.getMessage());
		}
		return id;
	}
	
	public String createSubscription(String customerId, String plan, String coupon) {
		String id = null;
		try {
			Stripe.apiKey = API_SK;
			
			Map<String, Object> item = new HashMap<>();
			item.put("plan", plan);
			
			Map<String, Object> items = new HashMap<>();
			items.put("0", item);
			
			Map<String, Object> params = new HashMap<>();
			params.put("customer", customerId);
			params.put("items", items);
			
			params.put("coupon", coupon);
			
			Subscription sub = Subscription.create(params);
			
			id = sub.getId();
			
		} catch (Exception ex) {
			log.error("Could not create a subscription: {}",ex.getMessage());
		}
		return id;
	}
	
	public String createSubscription(String customerId, String plan) {
		String id = null;
		try {
			Stripe.apiKey = API_SK;
			
			Map<String, Object> item = new HashMap<>();
			item.put("plan", plan);
			
			Map<String, Object> items = new HashMap<>();
			items.put("0", item);
			
			Map<String, Object> params = new HashMap<>();
			params.put("customer", customerId);
			params.put("items", items);
			
			Subscription sub = Subscription.create(params);
			
			id = sub.getId();
			
		} catch (Exception ex) {
			log.error("Could not create a subscription: {}",ex.getMessage());
		}
		return id;
	}
	
	public boolean cancelSubscription(String subscriptionId) {
		boolean status;
		try {
			Stripe.apiKey = API_SK;
			
			Subscription sub = Subscription.retrieve(subscriptionId);
			sub.cancel();
			
			status = true;
		} catch (Exception ex) {
			log.error("Could not cancel the subscription: {}",ex.getMessage());
			status = false;
		}
		return status;
	}
	// WILL SHOW ALL SUBS, MAYBE IN FUTURE IMPROVE THIS METHOD 
	// TO SHOW SUBS BASED ON USER'S FILTER, MAYBE FOR A DATATABLE...
	public List<Subscription> listSubscriptions(String customerId) {
		List<Subscription> list = new ArrayList<>();
		try {
			Stripe.apiKey = API_SK;
			
			Map<String, Object> params = new HashMap<>();
			params.put("customer", customerId);
			params.put("status", "all");
			
			SubscriptionCollection subscriptions = Subscription.list(params);
		
			list = subscriptions.getData();
		
		} catch (Exception ex) {
			log.error("Could not list all subscriptions: {}",ex.getMessage());
		}
		return list;
	}
}
