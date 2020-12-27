package com.example.demo.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.enums.ServiceName;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Service;
import com.example.demo.model.User;
import com.example.demo.payload.request.CancelSubscriptionRequest;
import com.example.demo.payload.request.CreateSubscriptionRequest;
import com.example.demo.payload.request.ListSubscriptionRequest;
import com.example.demo.payload.response.ApiResponse;
import com.example.demo.payload.response.StripeResponse;
import com.example.demo.repository.ServiceRepository;
import com.example.demo.service.StripeService;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
	private String subscriptionId;
	
	@Autowired
	StripeService stripeService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	ServiceRepository serviceRepository;
	
	@PostMapping("/subscription/create")
	@PreAuthorize("hasRole('USER_VIP')")
	public ResponseEntity<?> createSubscription(@Valid @RequestBody CreateSubscriptionRequest sub) {
		if (sub.getToken() == null) return new ResponseEntity(new ApiResponse(false, "Stripe payment token is missing, please provide one and try again."), HttpStatus.BAD_REQUEST);
		if (sub.getPlan() == null) return new ResponseEntity(new ApiResponse(false, "Stripe subscription plan is missing, please provide one and try again."), HttpStatus.BAD_REQUEST);
		
		String customerId = stripeService.createCustomer(sub.getName(), sub.getToken());
		if (customerId == null) return new ResponseEntity(new ApiResponse(false, "Something whent wrong while trying to create the customer."), HttpStatus.BAD_REQUEST);
		
		if (StringUtils.hasText(sub.getCoupon()))
			subscriptionId = stripeService.createSubscription(customerId, sub.getPlan(), sub.getCoupon());
		else
			subscriptionId = stripeService.createSubscription(customerId, sub.getPlan());
		
		if (subscriptionId == null) return new ResponseEntity(new ApiResponse(false, "Something whent wrong while trying to create a subscription."), HttpStatus.BAD_REQUEST);
		
		User user = userService.loadByUsernameOrEmail(sub.getEmail(), sub.getEmail())
				.orElseThrow(() -> new UsernameNotFoundException("No user was found with this email."));
		
		ServiceName serviceName;
		String service_name;
		
		switch(sub.getPlan()) {
			case "price_1I2EhPKxGSTi9Lm0vVcrwwk9g":
				serviceName = ServiceName.TRY_IT_FREE_72HOURS;
				service_name = "TRY_IT_FREE_72HOURS";
			break;
			case "price_1I1YOuKxGSTi9Lm0jKzVg6vY":
				serviceName = ServiceName.ONE_MONTH_SUBSCRIPTION;
				service_name = "ONE_MONTH_SUBSCRIPTION";
			break;
			case "price_1I2EhPKxGSTi9Lm0kQNLlwe3":
				serviceName = ServiceName.THREE_MONTHS_SUBSCRIPTION;
				service_name = "THREE_MONTHS_SUBSCRIPTION";
			break;
			case "price_1I2EhPKxGSTi9Lm0yKcrwst2":
				serviceName = ServiceName.SIX_MONTHS_SUBSCRIPTION;
				service_name = "SIX_MONTHS_SUBSCRIPTION";
			break;
			case "price_1I2EhQKxGSTi9Lm0dLi6OZEn":
				serviceName = ServiceName.ONE_YEAR_SUBSCRIPTION;
				service_name = "ONE_YEAR_SUBSCRIPTION";
			break;
			default:
				return new ResponseEntity(new ApiResponse(false, "Stripe subscription plan is not correct, please provide another and try again."), HttpStatus.BAD_REQUEST);
		}
		
		Service service = new Service(serviceName, customerId, subscriptionId);
		user.addService(service);
		userService.save(user);
		
		return new ResponseEntity(new StripeResponse(customerId, subscriptionId, service_name), HttpStatus.CREATED);
	}
	
	@PostMapping("/subscription/cancel")
	@PreAuthorize("hasRole('USER_VIP') or hasRole('ADMIN') or hasRole('MODERATOR')")
	public ResponseEntity<?> cancelSubscription(@Valid @RequestBody CancelSubscriptionRequest sub) {
		
		Service service = serviceRepository.findBysubscriptionId(sub.getId())
				.orElseThrow(() -> new ResourceNotFoundException(sub.getId()));
		subscriptionId = service.getSubscriptionId();
		stripeService.cancelSubscription(subscriptionId);
		serviceRepository.delete(service);
		return ResponseEntity.ok(new ApiResponse(true, "Subscription canceled successefully."));
	}
	
	@PostMapping("/subscription/list")
	@PreAuthorize("hasRole('USER_VIP') or hasRole('ADMIN') or hasRole('MODERATOR')")
	public ResponseEntity<?> listActiveSubscriptions(@Valid @RequestBody ListSubscriptionRequest list) {
		return ResponseEntity.ok(stripeService.listSubscriptions(list.getCustomer_id()));
	}
	
}
