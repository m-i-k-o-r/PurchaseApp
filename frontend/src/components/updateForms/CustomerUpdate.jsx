import React, {useState} from 'react';
import customerService from "../../api/services/CustomerService";
import {PenIcon, SaveIcon} from "lucide-react";
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "../dialog/Dialog";

const CustomerUpdate = ({ code }) => {
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
        customerService.update(customer).then((response) => {
            console.log(response)
            window.location.reload()
        }).catch((e) => {
            console.error(e)
        })
    }

    const handleGet = () => {
        customerService.get(code).then((response) => {
            setCustomer(response.data)
            console.log(customer)
        }).catch((e) => {
            console.error(e)
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="button-update"
                        type="button"
                        onClick={handleGet}>Редактировать<PenIcon size={16}/>
                </button>
            </ DialogTrigger>

            <DialogContent>
                <DialogTitle>
                    Изменение кастомера
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
                        <button className="button-save"
                                type="submit"
                                onClick={handleSave}>Сохранить<SaveIcon/>
                        </button>
                    </div>
                </ DialogDescription>
            </ DialogContent>
        </ Dialog>
    );
};

export default CustomerUpdate;
