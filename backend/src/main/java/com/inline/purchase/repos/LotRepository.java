package com.inline.purchase.repos;

import com.inline.purchase.domain.Tables;
import com.inline.purchase.models.Lot;
import lombok.RequiredArgsConstructor;
import org.jooq.DSLContext;
import org.jooq.exception.DataAccessException;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class LotRepository {
    private final DSLContext dsl;

    public Lot save(Lot lot) {
        checkUniqueId(lot);
        checkUnique(lot);

        return dsl.insertInto(Tables.LOT)
                .set(dsl.newRecord(Tables.LOT, lot))
                .returning()
                .fetchOptional()
                .orElseThrow(() -> new DataAccessException("Error create lot with code:" + lot.getLotId()))
                .into(Lot.class);
    }

    public Lot findById(long id) {
        return dsl.selectFrom(Tables.LOT)
                .where(Tables.LOT.LOT_ID.eq(id))
                .fetchOptional()
                .orElseThrow(() -> new DataAccessException("Error find lot with id: " + id))
                .into(Lot.class);
    }

    public List<Lot> findByCustomer(long customerCode) {
        return dsl.selectFrom(Tables.LOT)
                .where(Tables.LOT.CUSTOMER_CODE.eq(customerCode))
                .fetch()
                .into(Lot.class);
    }

    public List<Lot> findAll() {
        return dsl.selectFrom(Tables.LOT)
                .fetch()
                .into(Lot.class);
    }

    public List<Lot> findAllFree() {
        return dsl.selectFrom(Tables.LOT)
                .where(Tables.LOT.CUSTOMER_CODE.isNull())
                .fetch()
                .into(Lot.class);
    }

    public Lot update(Lot lot) {
        checkUnique(lot);

        return dsl.update(Tables.LOT)
                .set(dsl.newRecord(Tables.LOT, lot))
                .where(Tables.LOT.LOT_ID.eq(lot.getLotId()))
                .returning()
                .fetchOptional()
                .orElseThrow(() -> new DataAccessException("Error update lot with id: " + lot.getLotId()))
                .into(Lot.class);
    }

    public void delete(long id) {
        dsl.delete(Tables.LOT)
                .where(Tables.LOT.LOT_ID.eq(id))
                .execute();
    }

    private void checkUniqueId(Lot lot) {
        if (dsl.fetchExists(
                dsl.selectFrom(Tables.LOT)
                        .where(Tables.LOT.LOT_ID.eq(lot.getLotId())))
        ) {
            throw new DataAccessException("Lot with this ID already exists");
        }
    }

    private void checkUnique(Lot lot) {
        if (dsl.fetchExists(
                dsl.selectFrom(Tables.LOT)
                        .where(Tables.LOT.LOT_NAME.eq(lot.getLotName()))
                        .andNot(Tables.LOT.LOT_ID.eq(lot.getLotId())))
        ) {
            throw new DataAccessException("Lot with this NAME already exists");
        }
    }
}
