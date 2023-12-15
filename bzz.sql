create database BZZ_Immo;
use BZZ_Immo;

create table Schueler (
    id          INT PRIMARY KEY NOT NULL,
    name        VARCHAR(100),
    vorname     VARCHAR(100)
);

create table Reservierungen (
                          id          INT PRIMARY KEY NOT NULL,
                          room        VARCHAR(100),
                          date        VARCHAR(100)
);

SELECT * from Reservierungen;

insert into Schueler (id, name, vorname)
values (1, 'Roth', 'Nico');


