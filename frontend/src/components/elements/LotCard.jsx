import React, {useState} from 'react';
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "../dialog/Dialog";
import LotService from "../../api/services/LotService";
import {DeleteIcon} from "lucide-react";
import CustomerService from "../../api/services/CustomerService";
import LotUpdate from "../updateForms/LotUpdate";

const LotCard = ({lot}) => {

    const [customer, setCustomer] = useState([]);

    const [showDetails, setShowDetails] = useState(false);
    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const fetchCustomer = () => {
        CustomerService.get(lot.customerCode)
            .then((response) => {
                setCustomer(response.data);
            }).catch((e) => {
                console.error(e);
            });
    };

    const handleDelete = () => {
        LotService.delete(lot.lotId).then((response) => {
            window.location.reload()
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="button-card"
                        onClick={fetchCustomer}>
                    <p>ID: <span>{lot.lotId}</span></p>
                    <p>Название: <span>{lot.lotName}</span></p>
                </ button>
            </ DialogTrigger>

            <DialogContent>
                <DialogTitle>
                    Лот
                </ DialogTitle>

                <DialogDescription>
                    <div className="list-info">
                        <p><span>ID:</span> {lot.lotId}</p>
                        <p><span>Название:</span> {lot.lotName}</p>
                        <p><span>Описание:</span> {lot.lotDescription}</p>
                        <p><span>Цена:</span> {lot.price}</p>
                        <p><span>Валюта:</span> {lot.currencyCode}</p>
                        <p><span>Ставка НДС:</span> {lot.ndsRate}</p>
                    </div>
                    <div className="button-container">
                        <LotUpdate id={lot.lotId}/>
                        <button className="button-delete"
                                type="submit"
                                onClick={handleDelete}>Удалить<DeleteIcon/>
                        </button>
                    </div>
                </ DialogDescription>

                <br/>

                <DialogTitle>
                    Кастомер
                </DialogTitle>
                {lot.customerCode !== null ? (
                    <button className="button-card" onClick={toggleDetails}>
                        <p>Код: <span>{customer.customerCode}</span></p>
                        <p>ФИО: <span>{customer.customerName}</span></p>
                        {showDetails && (
                            <>
                                <p><span>ИНН:</span> {customer.customerInn}</p>
                                <p><span>Адресс:</span> {customer.customerPostalAddress}</p>
                                <p><span>Почта:</span> {customer.customerEmail}</p>
                                <p><span>Тип:</span> {customer.organizationFlag ? 'Юридическое лицо' : 'Физическое лицо'}</p>
                            </>
                        )}
                    </button>
                ) : (
                    <div className="list-info">
                        У этого лота нет кастомера
                    </div>
                )}
            </ DialogContent>
        </ Dialog>
    );
};

export default LotCard;