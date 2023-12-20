create database BZZ_Immo;
use BZZ_Immo;

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

create index schueler_id
    on Reservierungen (schueler_id);

SELECT * from Reservierungen;

insert into schueler (id, name, vorname)
values (1, 'Roth', 'Nico'),
       (2, 'Müller', 'Anna'),
       (3, 'Schmidt', 'Max'),
       (4, 'Becker', 'Lena'),
       (5, 'Wagner', 'Paul'),
       (6, 'Klein', 'Sophie'),
       (7, 'Hoffmann', 'Felix'),
       (8, 'Weber', 'Emma'),
       (9, 'Schulz', 'David'),
       (10, 'Koch', 'Laura'),
       (11, 'Lehmann', 'Benjamin'),
       (12, 'Herrmann', 'Hannah'),
       (13, 'Fischer', 'Leon'),
       (14, 'Schäfer', 'Julia'),
       (15, 'Peters', 'Sarah'),
       (16, 'Krause', 'Tim'),
       (17, 'Meier', 'Melanie'),
       (18, 'Wolf', 'Lisa'),
       (19, 'Bauer', 'Simon'),
       (20, 'Schneider', 'Marie');

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


select s.name, s.vorname, r.room, r.date from Reservierungen r
    inner join schueler s on r.schueler_id = s.id;

drop table Reservierungen;

