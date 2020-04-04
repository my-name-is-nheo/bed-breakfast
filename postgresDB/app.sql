


CREATE TABLE public.users (
user_id INT GENERATED ALWAYS AS IDENTITY,
name varchar(200),
imageUrl varchar(200)
rentals INTEGER NOT NULL,
body varchar(300),
date NOT NULL,
cleanliness INTEGER NOT NULL,
communication INTEGER NOT NULL,
value INTEGER NOT NULL,
accuracy INTEGER NOT NULL,
checkIn INTEGER NOT NULL,
location INTEGER NOT NULL,
);