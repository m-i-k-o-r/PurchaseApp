package com.inline.purchase.controllers;

import com.inline.purchase.models.Customer;
import com.inline.purchase.services.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/customer")
public class CustomerController {
    private final CustomerService customerService;

    @PostMapping()
    public Customer createCustomer(@RequestBody Customer item) {
        return customerService.createCustomer(item);
    }

    @GetMapping("/{code}")
    public Customer getCustomer(@PathVariable long code) {
        return customerService.getCustomer(code);
    }

    @GetMapping()
    public List<Customer> getCustomers() {
        return customerService.getCustomers();
    }

    @PutMapping()
    public Customer updateCustomer(@RequestBody Customer item) {
        return customerService.updateCustomer(item);
    }

    @DeleteMapping("/{code}")
    public void deleteCustomer(@PathVariable long code) {
        customerService.deleteCustomer(code);
    }
}
