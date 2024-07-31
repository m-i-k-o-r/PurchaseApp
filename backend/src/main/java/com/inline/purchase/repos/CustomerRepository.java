package com.inline.purchase.repos;

import com.inline.purchase.domain.Tables;
import com.inline.purchase.models.Customer;
import lombok.RequiredArgsConstructor;
import org.jooq.DSLContext;
import org.jooq.exception.DataAccessException;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class CustomerRepository {
    private final DSLContext dsl;

    public Customer save(Customer customer) {
        checkUniqueCode(customer);
        checkUnique(customer);

        return dsl.insertInto(Tables.CUSTOMER)
                .set(dsl.newRecord(Tables.CUSTOMER, customer))
                .returning()
                .fetchOptional()
                .orElseThrow(() -> new DataAccessException("Error create customer with code: " + customer.getCustomerCode()))
                .into(Customer.class);
    }

    public Customer findById(long code) {
        return dsl.selectFrom(Tables.CUSTOMER)
                .where(Tables.CUSTOMER.CUSTOMER_CODE.eq(code))
                .fetchOptional()
                .orElseThrow(() -> new DataAccessException("Error find customer with code: " + code))
                .into(Customer.class);
    }

    public List<Customer> findAll() {
        return dsl.selectFrom(Tables.CUSTOMER)
                .fetch()
                .into(Customer.class);
    }

    public Customer update(Customer customer) {
        checkUnique(customer);

        return dsl.update(Tables.CUSTOMER)
                .set(dsl.newRecord(Tables.CUSTOMER, customer))
                .where(Tables.CUSTOMER.CUSTOMER_CODE.eq(customer.getCustomerCode()))
                .returning()
                .fetchOptional()
                .orElseThrow(() -> new DataAccessException("Error update customer with code: " + customer.getCustomerCode()))
                .into(Customer.class);
    }

    public void delete(long code) {
        dsl.delete(Tables.CUSTOMER)
                .where(Tables.CUSTOMER.CUSTOMER_CODE.eq(code))
                .execute();
    }

    private void checkUniqueCode(Customer customer) {
        if (dsl.fetchExists(
                dsl.selectFrom(Tables.CUSTOMER)
                        .where(Tables.CUSTOMER.CUSTOMER_CODE.eq(customer.getCustomerCode())))
        ) {
            throw new DataAccessException("Customer with this CODE already exists");
        }
    }

    private void checkUnique(Customer customer) {
        if (dsl.fetchExists(
                dsl.selectFrom(Tables.CUSTOMER)
                        .where(Tables.CUSTOMER.CUSTOMER_NAME.eq(customer.getCustomerName()))
                        .andNot(Tables.CUSTOMER.CUSTOMER_CODE.eq(customer.getCustomerCode())))
        ) {
            throw new DataAccessException("Customer with this NAME already exists");
        }

        if (dsl.fetchExists(
                dsl.selectFrom(Tables.CUSTOMER)
                        .where(Tables.CUSTOMER.CUSTOMER_INN.eq(customer.getCustomerInn()))
                        .andNot(Tables.CUSTOMER.CUSTOMER_CODE.eq(customer.getCustomerCode())))
        ) {
            throw new DataAccessException("Customer with this INN already exists");
        }
    }
}
