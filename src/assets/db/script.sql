CREATE DATABASE db_mbanking;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "users"(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(30) NOT NULL UNIQUE,
  first_name VARCHAR(30) NOT NULL, 
  last_name VARCHAR(30) NOT NULL,
  password VARCHAR(100) NOT NULL,
  profile_image VARCHAR(255)
);


CREATE TABLE IF NOT EXISTS "banner"(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  banner_name VARCHAR(255),
  banner_image VARCHAR(255),
  description VARCHAR(255)
);

INSERT INTO "banner" 
  (banner_name,banner_image,description)
VALUES
  ('Banner 1', 'https://nutech-integrasi.app/dummy.jpg','Lerem Ipsum Dolor sit amet'),
  ('Banner 2','https://nutech-integrasi.app/dummy.jpg','Lerem Ipsum Dolor sit amet'),
  ('Banner 3','https://nutech-integrasi.app/dummy.jpg','Lerem Ipsum Dolor sit amet'),
  ('Banner 4','https://nutech-integrasi.app/dummy.jpg','Lerem Ipsum Dolor sit amet'),
  ('Banner 5','https://nutech-integrasi.app/dummy.jpg','Lerem Ipsum Dolor sit amet'),
  ('Banner 6','https://nutech-integrasi.app/dummy.jpg','Lerem Ipsum Dolor sit amet');
