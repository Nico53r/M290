create database BZZ_Immo;
use BZZ_Immo;

-- create tables
create table schueler (
                        id          INT PRIMARY KEY NOT NULL auto_increment,
                        name        VARCHAR(100),
                        vorname     VARCHAR(100)
);

create table Reservierungen (
                        id          INT auto_increment PRIMARY KEY,
                        room        VARCHAR(100),
                        date        VARCHAR(100),
                        schueler_id integer not null,
                        constraint Reservierungen_ibfk_1
                            foreign key (schueler_id) references Schueler (id)
);

create table comments (
                        id          INT auto_increment PRIMARY KEY NOT NULL,
                        comment     VARCHAR(100),
                        schueler_id INTEGER NOT NULL,
                        constraint comments_ibfk_1
                            foreign key (schueler_id) references Schueler (id)
);

create table rooms (
                          id        INT auto_increment PRIMARY KEY NOT NULL,
                          room      VARCHAR(100),
                          stock     VARCHAR(100)
);

insert into rooms (id, room, stock)
values (0, 'Klassenzimmer', '1. Stock'),
       (0, 'IT Zimmer', '2. Stock'),
       (0, 'Sporthalle', 'EG');


-- fill the tables
insert into schueler (id, name, vorname)
values (0, 'Roth', 'Nico'),
       (0, 'Müller', 'Anna'),
       (0, 'Schmidt', 'Max'),
       (0, 'Becker', 'Lena'),
       (0, 'Wagner', 'Paul'),
       (0, 'Klein', 'Sophie'),
       (0, 'Hoffmann', 'Felix'),
       (0, 'Weber', 'Emma'),
       (0, 'Schulz', 'David'),
       (0, 'Koch', 'Laura'),
       (0, 'Lehmann', 'Benjamin'),
       (0, 'Herrmann', 'Hannah'),
       (0, 'Fischer', 'Leon'),
       (0, 'Schäfer', 'Julia'),
       (0, 'Peters', 'Sarah'),
       (0, 'Krause', 'Tim'),
       (0, 'Meier', 'Melanie'),
       (0, 'Wolf', 'Lisa'),
       (0, 'Bauer', 'Simon'),
       (0, 'Schneider', 'Marie');

insert into Reservierungen (room, date, schueler_id)
values ('Klassenzimmer', '04.03.2023', 1),
       ('Sporthalle', '26.12.2023', 2),
       ('IT Zimmer', '10.01.2024', 3),
       ('Klassenzimmer', '15.03.2023', 4),
       ('Sporthalle', '22.12.2023', 11),
       ('IT Zimmer', '20.01.2024', 12),
       ('Klassenzimmer', '25.03.2023', 13),
       ('Sporthalle', '24.12.2023', 14),
       ('Klassenzimmer', '30.03.2023', 16),
       ('Sporthalle', '28.12.2023', 17),
       ('Sporthalle', '31.12.2023', 20);


insert into comments (comment, schueler_id)
values ('Der Raum ist top', 4),
       ('Konnte viel da lernen', 16),
       ('Nicht so mein Fall', 2),
       ('Gerne wieder!', 9),
       ('Nicht zu empfehlen...', 11);


-- select all the reservations
SELECT * from Reservierungen;

-- Smart select from students who wrote a comment and reserved
select s.name, s.vorname, r.room, r.date, c.comment from Reservierungen r
    inner join schueler s on r.schueler_id = s.id
    inner join comments c on c.schueler_id = s.id;

-- Smart select from students who reserved
select s.name, s.vorname, r.room, r.date from Reservierungen r
    inner join schueler s on r.schueler_id = s.id;

-- Smart select from students who reserved with possibility to filter the floors
select s.name, s.vorname, r.room, r.date, ro.stock from Reservierungen r
    inner join schueler s on r.schueler_id = s.id
    inner join rooms ro on r.room = ro.room
    where ro.stock = '1. Stock';

UPDATE Reservierungen
SET room = 'Klassenzimmer'
WHERE id = 3;

DELETE FROM Reservierungen
WHERE id = 2;

-- drop/delete the tables
drop table comments;
drop table Reservierungen;
drop table schueler;
drop table rooms;