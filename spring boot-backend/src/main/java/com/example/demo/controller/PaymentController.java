package com.example.demo.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
import com.example.demo.payload.response.ApiResponse;
import com.example.demo.repository.ServiceRepository;
import com.example.demo.service.StripeService;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
	
	@Autowired
	StripeService stripeService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	ServiceRepository serviceRepository;
	
	@PostMapping("/create_subscription")
	@PreAuthorize("hasRole('USER_VIP')")
	public ResponseEntity<?> createSubscription(@Valid @RequestBody CreateSubscriptionRequest sub) {
		if (sub.getToken() == null) return new ResponseEntity(new ApiResponse(false, "Stripe payment token is missing, please provide one and try again."), HttpStatus.BAD_REQUEST);
		if (sub.getPlan() == null) return new ResponseEntity(new ApiResponse(false, "Stripe subscription plan is missing, please provide one and try again."), HttpStatus.BAD_REQUEST);
		
		String customerId = stripeService.createCustomer(sub.getEmail(), sub.getToken());
		if (customerId == null) return new ResponseEntity(new ApiResponse(false, "Something whent wrong while trying to create the customer."), HttpStatus.BAD_REQUEST);
		
		String subscriptionId = stripeService.createSubscription(customerId, sub.getPlan(), sub.getCupon());
		if (subscriptionId == null) return new ResponseEntity(new ApiResponse(false, "Something whent wrong while trying to create a subscription."), HttpStatus.BAD_REQUEST);
		
		User user = userService.loadByUsernameOrEmail(sub.getEmail(), sub.getEmail())
				.orElseThrow(() -> new UsernameNotFoundException("No user was found with this email."));
		
		ServiceName serviceName;
		
		switch(sub.getPlan()) {
			case "TRY_IT_FREE_72HOURS":
				serviceName = ServiceName.TRY_IT_FREE_72HOURS;
			break;
			case "ONE_MONTH_SUBSCRIPTION":
				serviceName = ServiceName.ONE_MONTH_SUBSCRIPTION;
			break;
			case "THREE_MONTHS_SUBSCRIPTION":
				serviceName = ServiceName.THREE_MONTHS_SUBSCRIPTION;
			break;
			case "SIX_MONTHS_SUBSCRIPTION":
				serviceName = ServiceName.SIX_MONTHS_SUBSCRIPTION;
			break;
			case "ONE_YEAR_SUBSCRIPTION":
				serviceName = ServiceName.ONE_YEAR_SUBSCRIPTION;
			break;
			default:
				return new ResponseEntity(new ApiResponse(false, "Stripe subscription plan is not correct, please provide another one and try again."), HttpStatus.BAD_REQUEST);
		}
		
		Service service = new Service(serviceName, customerId, subscriptionId);
		user.addService(service);
		userService.save(user);
		
		return new ResponseEntity(sub.getEmail() + " has successefully subscribed.", HttpStatus.CREATED);
	}
	
	@PostMapping("/cancel_subscription")
	@PreAuthorize("hasRole('USER_VIP') or hasRole('ADMIN') or hasRole('MODERATOR')")
	public ResponseEntity<?> cancelSubscription(@Valid @RequestBody CancelSubscriptionRequest sub) {
		
		Service service = serviceRepository.findBysubscriptionId(sub.getId())
				.orElseThrow(() -> new ResourceNotFoundException(sub.getId()));
		serviceRepository.delete(service);
		return ResponseEntity.ok(new ApiResponse(true, "Subscription canceled successefully."));
	}
	
}
