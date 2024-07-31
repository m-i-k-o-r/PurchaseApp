import React, {useState} from 'react';
import customerService from "../../api/services/CustomerService";
import {PlusIcon, RefreshCcw, SaveIcon} from "lucide-react";
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "../dialog/Dialog";

const CustomerForm = () => {
    const [customer, setCustomer] = useState({
        customerCode: '',
        customerName: '',
        customerInn: '',
        customerPostalAddress: '',
        customerEmail: '',
        organizationFlag: false,
        personFlag: true
    })

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setCustomer((prevCustomer) => ({
            ...prevCustomer,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleTypeChange = (e) => {
        const value = e.target.value === 'organization'

        setCustomer((prevCustomer) => ({
            ...prevCustomer,
            organizationFlag: value,
            personFlag: !value,
        }))
    }

    const handleSave = () => {
        customerService.create(customer).then((response) => {
            console.log(response)
            window.location.reload()
        }).catch((e) => {
            console.error(e)
        })
    }

    const handleReset = () => {
        setCustomer({
            customerCode: '',
            customerName: '',
            customerInn: '',
            customerPostalAddress: '',
            customerEmail: '',
            organizationFlag: false,
            personFlag: true
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="button-create">
                    <PlusIcon size={14}/>
                    Создать нового кастомера
                </ button>
            </ DialogTrigger>

            <DialogContent>
                <DialogTitle>
                    Создание кастомера
                </ DialogTitle>

                <DialogDescription>
                    <div className="form-input">
                        <input
                            type="number"
                            name="customerCode"
                            value={customer.customerCode}
                            onChange={handleChange}
                            placeholder=" "
                        />
                        <label>Код</label>
                    </div>
                    <div className="form-input">
                        <input
                            type="text"
                            name="customerName"
                            value={customer.customerName}
                            onChange={handleChange}
                            placeholder=" "
                        />
                        <label>ФИО</label>
                    </div>
                    <div className="form-input">
                        <input
                            type="text"
                            name="customerInn"
                            value={customer.customerInn}
                            onChange={handleChange}
                            placeholder=" "
                        />
                        <label>ИНН</label>
                    </div>
                    <div className="form-input">
                        <input
                            type="text"
                            name="customerPostalAddress"
                            value={customer.customerPostalAddress}
                            onChange={handleChange}
                            placeholder=" "
                        />
                        <label>Адрес</label>
                    </div>
                    <div className="form-input">
                        <input
                            type="email"
                            name="customerEmail"
                            value={customer.customerEmail}
                            onChange={handleChange}
                            placeholder=" "
                        />
                        <label>Почта</label>
                    </div>
                    <div className="form-radio">
                        <label>Тип:</label>
                        <div className="radio-option">
                            <input
                                type="radio"
                                name="customerType"
                                value="organization"
                                checked={customer.organizationFlag}
                                onChange={handleTypeChange}
                            />
                            <label>Юридическое лицо</label>
                        </div>
                        <div className="radio-option">
                            <input
                                type="radio"
                                name="customerType"
                                value="person"
                                checked={customer.personFlag}
                                onChange={handleTypeChange}
                            />
                            <label>Физическое лицо</label>
                        </div>
                    </div>
                    <div className="button-container">
                        <button className="button-reset"
                                type="button"
                                onClick={handleReset}>Сбросить<RefreshCcw/></button>
                        <button className="button-save"
                                type="submit"
                                onClick={handleSave}>Сохранить<SaveIcon/></button>
                    </div>
                </ DialogDescription>
            </ DialogContent>
        </ Dialog>
    );
};

export default CustomerForm;
