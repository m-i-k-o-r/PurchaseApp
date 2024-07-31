import React, {useState} from 'react';
import lotService from "../../api/services/LotService";
import {PenIcon, SaveIcon} from "lucide-react";
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "../dialog/Dialog";

const LotUpdate = ({id}) => {
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
        const {name, value, type, checked} = e.target;
        setLot((prevLot) => ({
            ...prevLot,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleSave = () => {
        lotService.update(lot).then((response) => {
            console.log(response)
            window.location.reload()
        }).catch((e) => {
            console.error(e)
        })
    }

    const handleGet = () => {
        lotService.get(id).then((response) => {
            setLot(response.data)
            console.log(lot)
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
                    Изменение лота
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

export default LotUpdate;
