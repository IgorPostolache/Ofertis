package com.example.demo.controller;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.enums.ServiceName;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Subscription;
import com.example.demo.model.User;
import com.example.demo.payload.request.CancelSubscriptionRequest;
import com.example.demo.payload.request.CreateSubscriptionRequest;
import com.example.demo.payload.response.ApiResponse;
import com.example.demo.payload.response.StripeResponse;
import com.example.demo.repository.SubscriptionRepository;
import com.example.demo.security.JwtProvider;
import com.example.demo.service.StripeService;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {
	private String subscriptionId;
	
	@Autowired
	JwtProvider jwtProvider;
	
	@Autowired
	StripeService stripeService;
	
	@Autowired
	SubscriptionRepository subscriptionRepository;
	
	@Autowired
	UserService userService;
	
	@GetMapping
	@PreAuthorize("hasRole('USER_VIP') or hasRole('ADMIN') or hasRole('MODERATOR')")
	public List<Subscription> listActiveSubscriptions(HttpServletRequest req) {
		Long id = jwtProvider.getUserFromAuthorizationHeader(req).getId();
		List<Subscription> subscriptions = subscriptionRepository.findByuserId(id);
		return subscriptions;
	}
	
	@PostMapping("/add")
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
		
		ZoneId es = ZoneId.of( "Europe/Madrid" );
		LocalDateTime starts = LocalDateTime.now( es );
		LocalDateTime ends = starts;
		
		switch(sub.getPlan()) {
			case "price_1I2EhPKxGSTi9Lm0vVcrwwk9g":
				serviceName = ServiceName.TRY_IT_FREE_72HOURS;
				service_name = "TRY_IT_FREE_72HOURS";
			break;
			case "price_1I1YOuKxGSTi9Lm0jKzVg6vY":
				serviceName = ServiceName.ONE_MONTH_SUBSCRIPTION;
				service_name = "ONE_MONTH_SUBSCRIPTION";
				ends = starts.plusMonths(1);
			break;
			case "price_1I2EhPKxGSTi9Lm0kQNLlwe3":
				serviceName = ServiceName.THREE_MONTHS_SUBSCRIPTION;
				service_name = "THREE_MONTHS_SUBSCRIPTION";
				ends = starts.plusMonths(3);
			break;
			case "price_1I2EhPKxGSTi9Lm0yKcrwst2":
				serviceName = ServiceName.SIX_MONTHS_SUBSCRIPTION;
				service_name = "SIX_MONTHS_SUBSCRIPTION";
				ends = starts.plusMonths(6);
			break;
			case "price_1I2EhQKxGSTi9Lm0dLi6OZEn":
				serviceName = ServiceName.ONE_YEAR_SUBSCRIPTION;
				service_name = "ONE_YEAR_SUBSCRIPTION";
				ends = starts.plusYears(1);
			break;
			default:
				return new ResponseEntity(new ApiResponse(false, "Stripe subscription plan is not correct, please provide another and try again."), HttpStatus.BAD_REQUEST);
		}

		Subscription subscription = new Subscription(serviceName, customerId, subscriptionId);
		subscription.setStarts(starts);
		subscription.setEnds(ends);
		
		user.addService(subscription);
		userService.save(user);
		
		return new ResponseEntity(new StripeResponse(customerId, subscriptionId, service_name), HttpStatus.CREATED);
	}
	
	@PostMapping("/delete")
	@PreAuthorize("hasRole('USER_VIP') or hasRole('ADMIN') or hasRole('MODERATOR')")
	public ResponseEntity<?> cancelSubscription(@Valid @RequestBody CancelSubscriptionRequest sub) {
		
		Subscription subscription = subscriptionRepository.findBysubscriptionId(sub.getId())
				.orElseThrow(() -> new ResourceNotFoundException(sub.getId()));
		subscriptionId = subscription.getSubscriptionId();
		stripeService.cancelSubscription(subscriptionId);
		subscription.setRenews(false);
		
		subscriptionRepository.save(subscription);
		return ResponseEntity.ok(new ApiResponse(true, "Subscription canceled successefully."));
	}
	
}
