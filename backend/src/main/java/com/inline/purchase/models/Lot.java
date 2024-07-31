package com.inline.purchase.models;

import lombok.*;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Lot {
    private Long lotId;
    private String lotName;
    private String lotDescription;
    private BigDecimal price;
    private String currencyCode;
    private String ndsRate;
    private Long customerCode;
}