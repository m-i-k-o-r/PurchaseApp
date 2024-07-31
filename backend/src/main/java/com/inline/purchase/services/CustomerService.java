package com.inline.purchase.services;

import com.inline.purchase.models.Customer;
import com.inline.purchase.repos.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;

    public Customer createCustomer(Customer item) {
        return customerRepository.save(item);
    }

    public Customer getCustomer(long code) {
        return customerRepository.findById(code);
    }

    public List<Customer> getCustomers() {
        return customerRepository.findAll();
    }

    public Customer updateCustomer(Customer item) {
        /*Customer customer = customerRepository.findById(item.getCode());

        customer.setName(item.getName());
        customer.setInn(item.getInn());
        customer.setPostalAddress(item.getPostalAddress());
        customer.setEmail(item.getEmail());
        customer.setOrganization(item.isOrganization());
        customer.setPerson(item.isPerson());

        return CustomerMapper.INSTANCE.to(customerRepository.save(customer));*/
        return customerRepository.update(item);
    }

    public void deleteCustomer(long code) {
        getCustomer(code);
        customerRepository.delete(code);
    }
}
