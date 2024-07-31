import React, { useState, useEffect } from 'react';
import CustomerCard from './CustomerCard';
import customerService from "../../api/services/CustomerService";
import LotCard from "./LotCard";

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        customerService.getAll()
            .then(response => {
                setCustomers(response.data);
            })
            .catch(e => {
                console.error(e);
            });
    }, []);


    return (
        <>
            {customers.length > 0 ? (
                customers.map(customer => (
                    <CustomerCard key={customer.customerCode} customer={customer}/>
                ))
            ) : (
                <p className="list-info">
                    Список пуст
                </p>
            )}
        </>
    );
};

export default CustomerList;