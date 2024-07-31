package com.inline.purchase.controllers;

import com.inline.purchase.models.Lot;
import com.inline.purchase.services.LotService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/lot")
public class LotController {
    private final LotService lotService;

    @PostMapping()
    public Lot createLot(@RequestBody Lot item) {
        return lotService.createLot(item);
    }

    @GetMapping("/{id}")
    public Lot getLot(@PathVariable long id) {
        return lotService.getLot(id);
    }

    @GetMapping("/byCustomer/{customerCode}")
    public List<Lot> getLotByCustomer(@PathVariable long customerCode) {
        return lotService.getLotByCustomer(customerCode);
    }

    @GetMapping()
    public List<Lot> getLots() {
        return lotService.getLots();
    }

    @GetMapping("/free")
    public List<Lot> getLotsFree() {
        return lotService.getLotsFree();
    }

    @PutMapping()
    public Lot updateLot(@RequestBody Lot item) {
        return lotService.updateLot(item);
    }

    @DeleteMapping("/{id}")
    public void deleteLot(@PathVariable long id) {
        lotService.deleteLot(id);
    }
}
