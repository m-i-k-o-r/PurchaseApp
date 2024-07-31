package com.inline.purchase.models;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Customer {
    private Long customerCode;
    private String customerName;
    private String customerInn;
    private String customerPostalAddress;
    private String customerEmail;
    private boolean organizationFlag;
    private boolean personFlag;
}
