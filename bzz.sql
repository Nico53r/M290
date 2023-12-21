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

create table comments (
                                id          INT auto_increment PRIMARY KEY,
                                comment     VARCHAR(100),
                                schueler_id INTEGER NOT NULL,
                                constraint comments_ibfk_1
                                    foreign key (schueler_id) references Schueler (id)
);

SELECT * from Reservierungen;

insert into Schueler (id, name, vorname)
values (1, 'Roth', 'Nico');


insert into comments (comment, schueler_id)
values ('Der Raum ist top', 4),
       ('Konnte viel da lernen', 16),
       ('Nicht so mein Fall', 2),
       ('Gerne wieder!', 9),
       ('Nicht zu empfehlen...', 11);

-- Smart select from students who wrote a comment and reservated
select s.name, s.vorname, r.room, r.date, c.comment from Reservierungen r
    inner join schueler s on r.schueler_id = s.id
    inner join comments c on c.schueler_id = s.id;

-- Smart select from students who reservated
select s.name, s.vorname, r.room, r.date from Reservierungen r
    inner join schueler s on r.schueler_id = s.id;


drop table schueler;

