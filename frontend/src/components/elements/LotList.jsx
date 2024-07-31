import React, { useState, useEffect } from 'react';
import LotCard from './LotCard';
import lotService from "../../api/services/LotService";

const LotList = () => {
    const [lots, setLots] = useState([]);

    useEffect(() => {
        lotService.getAll()
            .then(response => {
                setLots(response.data);
            }).catch(e => {
            console.error(e);
        });
    }, []);

    return (
        <>
            {lots.length > 0 ? (
                lots.map(lot => (
                    <LotCard key={lot.lotId} lot={lot} />
                ))
            ) : (
                <p className="list-info">
                    Список пуст
                </p>
            )}
        </>
    );
};

export default LotList;