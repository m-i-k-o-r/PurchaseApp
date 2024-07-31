import React, {useState} from 'react';
import lotService from "../../api/services/LotService";
import {PlusIcon, RefreshCcw, SaveIcon} from "lucide-react";
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "../dialog/Dialog";

const LotForm = () => {
    const [lot, setLot] = useState({
        lotId: '',
        lotName: '',
        lotDescription: '',
        price: '',
        currencyCode: 'RUB',
        ndsRate: 'Без НДС',
        customerCode: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLot((prevLot) => ({
            ...prevLot,
            [name]: value,
        }));
    };

    const handleSave = () => {
        lotService.create(lot).then((response) => {
            console.log(response)
            window.location.reload()
        }).catch((e) => {
            console.error(e)
        });
    };

    const handleReset = () => {
        setLot({
            lotId: '',
            lotName: '',
            lotDescription: '',
            price: '',
            currencyCode: 'RUB',
            ndsRate: 'Без НДС',
            customerCode: ''
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="button-create">
                    <PlusIcon size={14}/>
                    Создать новый лот
                </ button>
            </ DialogTrigger>

            <DialogContent>
                <DialogTitle>
                    Создание лота
                </ DialogTitle>

                <DialogDescription>
                    <div className="form-input">
                        <input
                            type="number"
                            name="lotId"
                            value={lot.lotId}
                            onChange={handleChange}
                            placeholder=" "
                        />
                        <label>ID лота</label>
                    </div>
                    <div className="form-input">
                        <input
                            type="text"
                            name="lotName"
                            value={lot.lotName}
                            onChange={handleChange}
                            placeholder=" "
                        />
                        <label>Название</label>
                    </div>
                    <div className="form-input">
                        <input
                            type="text"
                            name="lotDescription"
                            value={lot.lotDescription}
                            onChange={handleChange}
                            placeholder=" "
                        />
                        <label>Описание</label>
                    </div>
                    <div className="form-input">
                        <input
                            type="number"
                            name="price"
                            value={lot.price}
                            onChange={handleChange}
                            placeholder=" "
                        />
                        <label>Цена</label>
                    </div>
                    <div className="form-select">
                        <select
                            name="currencyCode"
                            value={lot.currencyCode}
                            onChange={handleChange}
                        >
                            <option value="RUB">RUB</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                        </select>
                        <label>Валюта</label>
                    </div>
                    <div className="form-select">
                        <select
                            name="ndsRate"
                            value={lot.ndsRate}
                            onChange={handleChange}
                        >
                            <option value="Без НДС">Без НДС</option>
                            <option value="18%">18%</option>
                            <option value="20%">20%</option>
                        </select>
                        <label>Ставка НДС</label>
                    </div>
                    <div className="form-input">
                        <input
                            type="number"
                            name="customerCode"
                            value={lot.customerCode}
                            onChange={handleChange}
                            placeholder=" "
                        />
                        <label>Код клиента</label>
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

export default LotForm;