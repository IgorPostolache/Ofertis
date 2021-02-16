package com.example.demo.model;


import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.example.demo.enums.ServiceName;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "subscriptions")
@Getter @Setter @NoArgsConstructor @ToString
public class Subscription {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Enumerated(EnumType.STRING)
	@Column(length = 50)
	@NonNull private ServiceName name;
	
	@Column(name="starts")
	private LocalDateTime starts;
	
	@Column(name="ends")
	private LocalDateTime ends;
	
	@Column(name="period")
	private String period;
	
	@Column(name="price")
	private int price;
	
	@Column(name="renews")
	private boolean renews = true;
	
	@NonNull private String subscriptionId;
	@NonNull private String customerId;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
	@JsonIgnore
    private User user;
	
	public Subscription(@NonNull ServiceName name, @NonNull String customerId, @NonNull String subscriptionId) {
		this.name = name;
		this.customerId = customerId;
		this.subscriptionId = subscriptionId;
	}
	
	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Subscription sub = (Subscription) o;
        return Objects.equals(id, sub.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

}
