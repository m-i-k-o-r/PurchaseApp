import React, {useState} from 'react';
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "../dialog/Dialog";
import LotService from "../../api/services/LotService";
import CustomerUpdate from "../updateForms/CustomerUpdate";
import {DeleteIcon} from "lucide-react";
import CustomerService from "../../api/services/CustomerService";

const CustomerCard = ({customer}) => {

    const [lots, setLots] = useState([]);

    const [showDetails, setShowDetails] = useState(false);
    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const fetchLots = () => {
        LotService.getByCustomer(customer.customerCode)
            .then((response) => {
                setLots(response.data);
            })
            .catch((e) => {
                console.error(e);
            });
    };


    const handleDelete = () => {
        CustomerService.delete(customer.customerCode).then((response) => {
            window.location.reload()
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="button-card"
                        onClick={fetchLots}>
                    <p>Код: <span>{customer.customerCode}</span></p>
                    <p>ФИО: <span>{customer.customerName}</span></p>
                </ button>
            </ DialogTrigger>

            <DialogContent>
                <DialogTitle>
                    Кастомер
                </ DialogTitle>

                <DialogDescription>
                    <div className="list-info">
                        <p><span>Код:</span> {customer.customerCode}</p>
                        <p><span>ФИО:</span> {customer.customerName}</p>
                        <p><span>ИНН:</span> {customer.customerInn}</p>
                        <p><span>Адресс:</span> {customer.customerPostalAddress}</p>
                        <p><span>Почта:</span> {customer.customerEmail}</p>
                        <p><span>Тип:</span> {customer.organizationFlag ? 'Юридическое лицо' : 'Физическое лицо'}</p>
                    </div>
                    <div className="button-container">
                        <CustomerUpdate code={customer.customerCode}/>
                        <button className="button-delete"
                                type="submit"
                                onClick={handleDelete}>Удалить<DeleteIcon/>
                        </button>
                    </div>
                </ DialogDescription>

                <br/>

                <DialogTitle>
                    Лоты кастомера
                </DialogTitle>
                {lots.length > 0 ? (
                    lots.map((lot) => (
                        <button key={lot.id} className="button-card" onClick={toggleDetails}>
                            <p>ID: <span>{lot.lotId}</span></p>
                            <p>Название: <span>{lot.lotName}</span></p>
                            {showDetails && (
                                <>
                                    <p><span>Описание:</span> {lot.lotDescription}</p>
                                    <p><span>Цена:</span> {lot.price}</p>
                                    <p><span>Валюта:</span> {lot.currencyCode}</p>
                                    <p><span>Ставка НДС:</span> {lot.ndsRate}</p>
                                </>
                            )}
                        </button>
                    ))
                ) : (
                    <div className="list-info">
                        Лоты не найдены
                    </div>
                )}
            </ DialogContent>
        </ Dialog>
    );
};

export default CustomerCard;