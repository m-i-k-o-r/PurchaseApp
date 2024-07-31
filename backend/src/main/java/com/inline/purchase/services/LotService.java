package com.inline.purchase.services;

import com.inline.purchase.models.Lot;
import com.inline.purchase.repos.CustomerRepository;
import com.inline.purchase.repos.LotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LotService {
    private final LotRepository lotRepository;
    private final CustomerRepository customerRepository;

    public Lot createLot(Lot item) {
        return lotRepository.save(item);
    }

    public Lot getLot(long id) {
        return lotRepository.findById(id);
    }

    public List<Lot> getLotByCustomer(long code) {
        return lotRepository.findByCustomer(code);
    }

    public List<Lot> getLots() {
        return lotRepository.findAll();
    }

    public List<Lot> getLotsFree() {
        return lotRepository.findAllFree();
    }

    public Lot updateLot(Lot item) {
        /*Lot lot = lotRepository.findById(item.getId());

        lot.setCustomer(customerRepository.findById(item.getCustomerCode()));

        lot.setName(item.getName());
        lot.setPrice(item.getPrice());
        lot.setCurrencyCode(item.getCurrencyCode().name());
        lot.setNdsRate(item.getNdsRate().getRate());

        return LotMapper.INSTANCE.to(lotRepository.save(lot));*/
        return lotRepository.update(item);
    }

    public void deleteLot(long id) {
        getLot(id);
        lotRepository.delete(id);
    }
}
