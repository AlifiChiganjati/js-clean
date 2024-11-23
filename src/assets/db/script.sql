CREATE DATABASE db_sms_ppob;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "users"(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(255) NOT NULL, 
  last_name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  profile_image VARCHAR(255),
  saldo DECIMAL(10,2) DEFAULT 0
);


CREATE TABLE IF NOT EXISTS "banner"(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  banner_name VARCHAR(255),
  banner_image VARCHAR(255),
  description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS "layanan"(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_code VARCHAR(255),
  service_name VARCHAR(255),
  service_icon VARCHAR(255),
  service_tarif DECIMAL(10,2)
);

CREATE TABLE IF NOT EXISTS "transaction"(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  layanan_id UUID REFERENCES layanan(id),
  transaction_type VARCHAR(255) NOT NULL,
  invoice_number VARCHAR(255) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  created_on TIMESTAMP
);

INSERT INTO "banner" 
  (banner_name,banner_image,description)
VALUES
  ('Banner 1','https://nutech-integrasi.app/dummy.jpg','Lerem Ipsum Dolor sit amet'),
  ('Banner 2','https://nutech-integrasi.app/dummy.jpg','Lerem Ipsum Dolor sit amet'),
  ('Banner 3','https://nutech-integrasi.app/dummy.jpg','Lerem Ipsum Dolor sit amet'),
  ('Banner 4','https://nutech-integrasi.app/dummy.jpg','Lerem Ipsum Dolor sit amet'),
  ('Banner 5','https://nutech-integrasi.app/dummy.jpg','Lerem Ipsum Dolor sit amet'),
  ('Banner 6','https://nutech-integrasi.app/dummy.jpg','Lerem Ipsum Dolor sit amet');

INSERT INTO "layanan"
  (service_code, service_name, service_icon, service_tarif)
VALUES 
  ('PAJAK','Pajak PBB','https://nutech-integrasi.app/dummy.jpg',40000),
  ('PLN','Listrik','https://nutech-integrasi.app/dummy.jpg',10000),
  ('PDAM','PDAM Berlangganan','https://nutech-integrasi.app/dummy.jpg',40000),
  ('PULSA','Pulsa','https://nutech-integrasi.app/dummy.jpg',40000),
  ('PGN','PGN Berlangganan','https://nutech-integrasi.app/dummy.jpg',50000),
  ('MUSIK','Musik Berlangganan','https://nutech-integrasi.app/dummy.jpg',50000),
  ('TV','TV Berlangganan','https://nutech-integrasi.app/dummy.jpg',50000),
  ('PAKET_DATA','Paket Data','https://nutech-integrasi.app/dummy.jpg',50000),
  ('VOUCHER_GAME','Voucher Game','https://nutech-integrasi.app/dummy.jpg',100000),
  ('VOUCHER_MAKANAN','Voucher Makanan','https://nutech-integrasi.app/dummy.jpg',100000),
  ('QURBAN','Qurban','https://nutech-integrasi.app/dummy.jpg',200000),
  ('ZAKAT','Zakat','https://nutech-integrasi.app/dummy.jpg',300000);
