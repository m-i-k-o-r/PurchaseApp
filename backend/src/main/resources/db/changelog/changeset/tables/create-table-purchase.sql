create table customer
(
    customer_code           bigint primary key,
    customer_name           varchar not null unique,
    customer_inn            varchar not null unique,
    customer_postal_address varchar,
    customer_email          varchar,
    organization_flag         bool    not null default false,
    person_flag               bool    not null default false
);

create table lot
(
    lot_id          bigint primary key,
    lot_name        varchar not null unique,
    lot_description varchar,
    customer_code   bigint,
    price           numeric not null,
    currency_code   varchar not null default 'USD',
    nds_rate        varchar not null default 'Без НДС',

    foreign key (customer_code) references customer (customer_code) on delete set null,

    check (currency_code IN ('RUB', 'USD', 'EUR')),
    check (nds_rate IN ('Без НДС', '18%', '20%'))
);