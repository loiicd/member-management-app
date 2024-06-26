import { Client } from 'pg'

const resetDatabase = async () => {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'docker',
    port: 5432
  })
  await client.connect()

  const query = `
    DROP TABLE IF EXISTS "user_qualification_rel" CASCADE;
    DROP TABLE IF EXISTS "user_account_rel" CASCADE;
    DROP TABLE IF EXISTS "user" CASCADE;
    DROP TABLE IF EXISTS "qualification" CASCADE;
    DROP TABLE IF EXISTS "account" CASCADE;
    DROP TABLE IF EXISTS "user_session" CASCADE;
    DROP TABLE IF EXISTS "group" CASCADE;
    DROP TABLE IF EXISTS "user_group_rel" CASCADE;
    DROP TABLE IF EXISTS "group_filter" CASCADE;
    
    CREATE EXTENSION IF NOT EXISTS pg_trgm;
    
    CREATE TABLE "user" (
      id text NOT NULL,
      firstname text NOT NULL,
      lastname text NOT NULL,
      birthdate date,
      address text,
      email text,
      phone text,
      login_email text UNIQUE,
      password text,
      passwordsalt text, 
      is_online_user boolean NOT NULL,
      webaccess boolean NOT NULL,
      version integer NOT NULL DEFAULT 0,
      created_at timestamp NOT NULL DEFAULT now()::timestamp,
      updated_at timestamp NOT NULL DEFAULT now()::timestamp,
      searchvector tsvector,
      PRIMARY KEY (id)
    );
    
    CREATE TABLE "account" (
      id text NOT NULL,
      organisation_name text NOT NULL,
      PRIMARY KEY (id)
    );
    
    CREATE TABLE "user_account_rel" (
      user_id text NOT NULL,
      account_id text NOT NULL,
      is_admin boolean NOT NULL,
      PRIMARY KEY (user_id, account_id),
      FOREIGN KEY (user_id) REFERENCES "user" (id),
      FOREIGN KEY (account_id) REFERENCES "account" (id)
    );
    
    CREATE TABLE "qualification" (
      id text NOT NULL,
      account_id text NOT NULL,
      name text NOT NULL,
      abbreviation text,
      color text,
      version integer NOT NULL DEFAULT 0,
      created_at timestamp NOT NULL DEFAULT now()::timestamp,
      updated_at timestamp NOT NULL DEFAULT now()::timestamp,
      PRIMARY KEY (id),
      FOREIGN KEY (account_id) REFERENCES "account" (id)
    );
    
    CREATE TABLE "user_qualification_rel" (
      user_id text NOT NULL,
      qualification_id text NOT NULL,
      account_id text NOT NULL,
      PRIMARY KEY (user_id, qualification_id, account_id),
      FOREIGN KEY (user_id) REFERENCES "user" (id),
      FOREIGN KEY (qualification_id) REFERENCES "qualification" (id),
      FOREIGN KEY (account_id) REFERENCES "account" (id)
    );

    CREATE TABLE "group" (
      id text NOT NULL,
      account_id text NOT NULL,
      name text NOT NULL,
      description text,
      type text NOT NULL,
      color text,
      version integer NOT NULL DEFAULT 0,
      created_at timestamp NOT NULL DEFAULT now()::timestamp,
      updated_at timestamp NOT NULL DEFAULT now()::timestamp,
      PRIMARY KEY (id),
      FOREIGN KEY (account_id) REFERENCES "account" (id)
    );

    CREATE Table "group_filter" (
      id text NOT NULL,
      group_id text NOT NULL,
      entity text NOT NULL,
      rule text NOT NULL,
      value text NOT NULL,
      PRIMARY KEY (id),
      FOREIGN KEY (group_id) REFERENCES "group" (id)
    );

    CREATE Table "user_group_rel" (
      user_id text NOT NULL,
      group_id text NOT NULL,
      account_id text NOT NULL,
      PRIMARY KEY (user_id, group_id, account_id),
      FOREIGN KEY (user_id) REFERENCES "user" (id),
      FOREIGN KEY (group_id) REFERENCES "group" (id),
      FOREIGN KEY (account_id) REFERENCES "account" (id)
    );

    CREATE TABLE "user_session" (
      id text NOT NULL,
      user_id text NOT NULL,
      token text NOT NULL,
      created_at timestamp NOT NULL DEFAULT now()::timestamp,
      expires_at timestamp NOT NULL,
      PRIMARY KEY (id)
    );
    
    CREATE INDEX searchvectorindex ON "user" USING gin(searchvector);`

  const query2 = `
    INSERT INTO "user" (id, firstname, lastname, birthdate, address, email, phone, login_email, password, passwordsalt, is_online_user, webaccess, searchvector)
    VALUES
      ('54be0d0d-9fc5-4f40-8c06-7509e219c1f8', 'Max', 'Mustermann', '1990-01-15', 'Musterstraße 123, 12345 Musterstadt', 'max.mustermann@example.com', '+49 123 456789', null, null, null, false, false, to_tsvector('german', 'Max Mustermann 1990-01-15 Musterstraße 123, 12345 Musterstadt max.mustermann@example.com +49 123 456789')),
      ('6d948233-aa3c-4d3d-a9ed-7dafb2d8d454', 'Maria', 'Musterfrau', '1985-05-20', 'Musterweg 456, 54321 Musterstadt', 'maria.musterfrau@example.com', '+49 987 654321', null, null, null, false, false, to_tsvector('german', 'Maria Musterfrau 1985-05-20 Musterweg 456, 54321 Musterstadt maria.musterfrau@example.com +49 987 654321')),
      ('081b3705-45cd-42c4-ac7e-f39a134625f1', 'John', 'Doe', '1982-08-08', 'Doe Street 789, 67890 Doeville', 'john.doe@example.com', '+1 555 7890123', null, null, null, false, false, to_tsvector('german', 'John Doe 1982-08-08 Doe Street 789, 67890 Doeville john.doe@example.com +1 555 7890123')),
      ('8e82de9c-3031-4174-afb1-e4d8faa0b8e8', 'Alice', 'Jones', '1995-03-25', 'Jones Lane 456, 56789 Wonderland', 'alice.jones@example.com', '+44 20 12345678', null, null, null, false, false, to_tsvector('german', 'Alice Jones 1995-03-25 Jones Lane 456, 56789 Wonderland alice.jones@example.com +44 20 12345678')),
      ('a72aaca2-6691-4637-987d-ca48ed041543', 'Bob', 'Smith', '1988-11-10', 'Smith Road 789, 34567 Cityville', 'bob.smith@example.com', '+1 123 9876543', null, null, null, false, false, to_tsvector('german', 'Bob Smith 1988-11-10 Smith Road 789, 34567 Cityville bob.smith@example.com +1 123 9876543')),
      ('199fe9f8-249d-41c1-b217-7e093371de61', 'Eva', 'Miller', '1992-07-03', 'Miller Avenue 101, 54321 Townsville', 'eva.miller@example.com', '+61 2 34567890', null, null, null, false, false, to_tsvector('german', 'Eva Miller 1992-07-03 Miller Avenue 101, 54321 Townsville eva.miller@example.com +61 2 34567890')),
      ('1b075520-c26c-4d31-9dba-1a22fa5ada3c', 'David', 'Brown', '1980-04-18', 'Brown Street 222, 67890 Villeburg', 'david.brown@example.com', '+49 30 55555555', null, null, null, false, false, to_tsvector('german', 'David Brown 1980-04-18 Brown Street 222, 67890 Villeburg david.brown@example.com +49 30 55555555')),
      ('0eb8a59f-42ee-41ea-9dd8-897cbc6e6399', 'Sophie', 'Clark', '1998-09-12', 'Clark Lane 33, 45678 Parktown', 'sophie.clark@example.com', '+1 415 1112233', null, null, null, false, false, to_tsvector('german', 'Sophie Clark 1998-09-12 Clark Lane 33, 45678 Parktown sophie.clark@example.com +1 415 1112233')),
      ('5ba021b7-b89f-4b51-b0ef-4bcffd746654', 'Michael', 'White', '1984-06-30', 'White Road 77, 56789 Whitetown', 'michael.white@example.com', '+44 20 87654321', null, null, null, false, false, to_tsvector('german', 'Michael White 1984-06-30 White Road 77, 56789 Whitetown michael.white@example.com +44 20 87654321')),
      ('97c9a9fd-7da6-4741-b5b2-2e95a5dec2fb', 'Emma', 'Taylor', '1991-12-05', 'Taylor Street 555, 67890 Taylorville', 'emma.taylor@example.com', '+61 2 98765432', null, null, null, false, false, to_tsvector('german', 'Emma Taylor 1991-12-05 Taylor Street 555, 67890 Taylorville emma.taylor@example.com +61 2 98765432')),
      ('9ec2b4a1-ebbc-4c49-ba56-fe37ac035fc', 'Oliver', 'Anderson', '1987-02-22', 'Anderson Avenue 44, 34567 Andersonburg', 'oliver.anderson@example.com', '+49 40 12345678', null, null, null, false, false, to_tsvector('german', 'Oliver Anderson 1987-02-22 Anderson Avenue 44, 34567 Andersonburg oliver.anderson@example.com +49 40 12345678')),
      ('1df6f7b4-b145-4ac5-a494-7c2efed48cb0', 'Isabella', 'Wong', '1993-10-15', 'Wong Lane 888, 56789 Wongville', 'isabella.wong@example.com', '+1 408 5557890', null, null, null, false, false, to_tsvector('german', 'Isabella Wong 1993-10-15 Wong Lane 888, 56789 Wongville isabella.wong@example.com +1 408 5557890')),
      ('05cf4055-50a8-41c6-9907-1ef12d5a45ff', 'Daniel', 'Garcia', '1981-05-08', 'Garcia Street 777, 67890 Garciatown', 'daniel.garcia@example.com', '+34 91 23456789', null, null, null, false, false, to_tsvector('german', 'Daniel Garcia 1981-05-08 Garcia Street 777, 67890 Garciatown daniel.garcia@example.com +34 91 23456789')),
      ('6dc0c8b3-fb7b-4dce-9454-e225e60d4673', 'Sophia', 'Nguyen', '1997-01-28', 'Nguyen Road 222, 54321 Nguyenville', 'sophia.nguyen@example.com', '+84 24 98765432', null, null, null, false, false, to_tsvector('german', 'Sophia Nguyen 1997-01-28 Nguyen Road 222, 54321 Nguyenville sophia.nguyen@example.com +84 24 98765432')),
      ('a8e3c3d7-cd4e-48b2-9e85-70a64f0e7e0f', 'James', 'Lee', '1983-11-20', 'Lee Lane 666, 34567 Leeville', 'james.lee@example.com', '+82 2 34567890', null, null, null, false, false, to_tsvector('german', 'James Lee 1983-11-20 Lee Lane 666, 34567 Leeville james.lee@example.com +82 2 34567890')),
      ('ca8f96ce-7666-4707-b6f6-cca9af13f387', 'Ava', 'Hernandez', '1996-08-03', 'Hernandez Avenue 333, 67890 Hernandeztown', 'ava.hernandez@example.com', '+1 213 5551234', null, null, null, false, false, to_tsvector('german', 'Ava Hernandez 1996-08-03 Hernandez Avenue 333, 67890 Hernandeztown ava.hernandez@example.com +1 213 5551234')),
      ('a5b5837c-e518-4e7a-9189-f40c4e76aec2', 'Liam', 'Kim', '1989-03-12', 'Kim Street 111, 56789 Kimburg', 'liam.kim@example.com', '+82 2 98765432', null, null, null, false, false, to_tsvector('german', 'Liam Kim 1989-03-12 Kim Street 111, 56789 Kimburg liam.kim@example.com +82 2 98765432')),
      ('3b56aa5d-445c-4110-b27b-f37c4d9a6ac1', 'Charlotte', 'Martinez', '1994-09-25', 'Martinez Road 123, 54321 Martineztown', 'charlotte.martinez@example.com', '+34 93 87654321', null, null, null, false, false, to_tsvector('german', 'Charlotte Martinez 1994-09-25 Martinez Road 123, 54321 Martineztown charlotte.martinez@example.com +34 93 87654321')),
      ('07db9b80-b9cf-4639-94cb-22da1f7edbdf', 'Benjamin', 'Lopez', '1986-06-18', 'Lopez Lane 777, 67890 Lopeztown', 'benjamin.lopez@example.com', '+1 917 5556789', null, null, null, false, false, to_tsvector('german', 'Benjamin Lopez 1986-06-18 Lopez Lane 777, 67890 Lopeztown benjamin.lopez@example.com +1 917 5556789')),
      ('4c3d7edb-dab2-4228-a033-a90b8582ef47', 'Mia', 'Baker', '1999-02-10', 'Baker Avenue 444, 34567 Bakerville', 'mia.baker@example.com', '+61 2 12345678', null, null, null, false, false, to_tsvector('german', 'Mia Baker 1999-02-10 Baker Avenue 444, 34567 Bakerville mia.baker@example.com +61 2 12345678')),
      ('5ecf4875-1311-4157-9af4-847581439690', 'Admin', 'Admin', null, null, 'admin@example.com', null, 'admin@example.com', '$2a$10$DOyVPpgyw2zUxyPl4I4Kpu5Dg73QcaimXXhHFBjd15qxzc2WPOzYW', '$2a$10$jR5kyQ2QHqtYYs2ZGD7bGO', true, true, to_tsvector('german', 'Admin Admin admin@example.com')),
      ('0f3834bd-3e8f-4f5b-9105-eb37fc92d120', 'Jacob', 'Gonzalez', '1989-07-30', 'Gonzalez Road 333, 67890 Gonzaleztown', 'jacob.gonzalez@example.com', '+1 305 5554321', null, null, null, false, false, to_tsvector('german', 'Jacob Gonzalez 1989-07-30 Gonzalez Road 333, 67890 Gonzaleztown jacob.gonzalez@example.com +1 305 5554321')),
      ('9b2a3fc6-cd10-4b03-ba91-be96f1fda6b4', 'Emily', 'Perez', '1997-04-02', 'Perez Lane 222, 56789 Perezburg', 'emily.perez@example.com', '+1 925 5555678', null, null, null, false, false, to_tsvector('german', 'Emily Perez 1997-04-02 Perez Lane 222, 56789 Perezburg emily.perez@example.com +1 925 5555678')),
      ('be810a07-e2f6-4c91-9c21-6eb75fec8f5a', 'Mason', 'Rodriguez', '1982-10-03', 'Rodriguez Street 222, 34567 Rodrigueztown', 'mason.rodriguez@example.com', '+1 786 5556789', null, null, null, false, false, to_tsvector('german', 'Mason Rodriguez 1982-10-03 Rodriguez Street 222, 34567 Rodrigueztown mason.rodriguez@example.com +1 786 5556789')),
      ('5e9d22f7-45f9-4083-b85a-e8351f679a0a', 'Avery', 'Adams', '1994-06-25', 'Adams Road 777, 54321 Adamsville', 'avery.adams@example.com', '+1 619 5557890', null, null, null, false, false, to_tsvector('german', 'Avery Adams 1994-06-25 Adams Road 777, 54321 Adamsville avery.adams@example.com +1 619 5557890')),
      ('3cb52ec1-7dde-4b76-b578-2da98e353f4c', 'Evelyn', 'Campbell', '1987-02-23', 'Campbell Lane 555, 67890 Campbelltown', 'evelyn.campbell@example.com', '+1 212 5551234', null, null, null, false, false, to_tsvector('german', 'Evelyn Campbell 1987-02-23 Campbell Lane 555, 67890 Campbelltown evelyn.campbell@example.com +1 212 5551234')),
      ('c8f97a3d-9462-43e9-ab69-aa5724bc1cc3', 'Connor', 'Mitchell', '1990-11-05', 'Mitchell Street 666, 34567 Mitchellville', 'connor.mitchell@example.com', '+1 312 5556789', null, null, null, false, false, to_tsvector('german', 'Connor Mitchell 1990-11-05 Mitchell Street 666, 34567 Mitchellville connor.mitchell@example.com +1 312 5556789')),
      ('19e9da68-a2d9-415b-a78c-02e8327c8d41', 'Chloe', 'Jackson', '1996-09-15', 'Jackson Avenue 222, 54321 Jacksontown', 'chloe.jackson@example.com', '+1 415 5557890', null, null, null, false, false, to_tsvector('german', 'Chloe Jackson 1996-09-15 Jackson Avenue 222, 54321 Jacksontown chloe.jackson@example.com +1 415 5557890')),
      ('2f482226-4b0d-4d2c-9f5f-e60bb1e68d02', 'Sebastian', 'Lee', '1983-12-02', 'Lee Avenue 555, 56789 Leeville', 'sebastian.lee@example.com', '+1 213 5556789', null, null, null, false, false, to_tsvector('german', 'Sebastian Lee 1983-12-02 Lee Avenue 555, 56789 Leeville sebastian.lee@example.com +1 213 5556789')),
      ('71a5e679-90b9-4adb-82cb-04a131d76054', 'Madison', 'Smith', '1993-08-13', 'Smith Lane 777, 34567 Smithville', 'madison.smith@example.com', '+1 234 5551234', null, null, null, false, false, to_tsvector('german', 'Madison Smith 1993-08-13 Smith Lane 777, 34567 Smithville madison.smith@example.com +1 234 5551234')),
      ('a5d8e6f6-6e30-45b0-9caf-460b16561d7a', 'Henry', 'Wright', '1985-05-09', 'Wright Road 222, 67890 Wrighttown', 'henry.wright@example.com', '+1 646 5557890', null, null, null, false, false, to_tsvector('german', 'Henry Wright 1985-05-09 Wright Road 222, 67890 Wrighttown henry.wright@example.com +1 646 5557890')),
      ('d482479b-9c0d-4d00-8f94-bd0c8f1432f5', 'Lily', 'Carter', '1999-11-02', 'Carter Avenue 555, 56789 Carterville', 'lily.carter@example.com', '+1 312 5555678', null, null, null, false, false, to_tsvector('german', 'Lily Carter 1999-11-02 Carter Avenue 555, 56789 Carterville lily.carter@example.com +1 312 5555678')),
      ('ac439d09-5ebd-4b5b-8a52-59e854190240', 'Owen', 'Garcia', '1980-06-04', 'Garcia Avenue 222, 34567 Garciatown', 'owen.garcia@example.com', '+1 305 5555678', null, null, null, false, false, to_tsvector('german', 'Owen Garcia 1980-06-04 Garcia Avenue 222, 34567 Garciatown owen.garcia@example.com +1 305 5555678')),
      ('ecf27129-eb9c-4b0f-8d17-891f3b120b7e', 'Addison', 'Harris', '1992-03-01', 'Harris Lane 444, 67890 Harristown', 'addison.harris@example.com', '+1 415 5554567', null, null, null, false, false, to_tsvector('german', 'Addison Harris 1992-03-01 Harris Lane 444, 67890 Harristown addison.harris@example.com +1 415 5554567')),
      ('d16bb3f4-6f34-4790-88e2-e9aa8c87e1e5', 'Luke', 'Martin', '1987-12-24', 'Martin Street 555, 54321 Martinez', 'luke.martin@example.com', '+1 925 5556789', null, null, null, false, false, to_tsvector('german', 'Luke Martin 1987-12-24 Martin Street 555, 54321 Martinez luke.martin@example.com +1 925 5556789')),
      ('e69c4837-cd79-4064-a4bd-a7e2f9eba740', 'Natalie', 'Jackson', '1995-02-16', 'Jackson Road 777, 56789 Jacksontown', 'natalie.jackson@example.com', '+1 213 5556789', null, null, null, false, false, to_tsvector('german', 'Natalie Jackson 1995-02-16 Jackson Road 777, 56789 Jacksontown natalie.jackson@example.com +1 213 5556789')),
      ('7ca5c388-d5bd-4871-bd01-a330499357a0', 'Gabriel', 'White', '1982-09-18', 'White Street 222, 34567 Whitetown', 'gabriel.white@example.com', '+1 786 5557890', null, null, null, false, false, to_tsvector('german', 'Gabriel White 1982-09-18 White Street 222'));

    INSERT INTO "account" (id, organisation_name)
    VALUES
      ('44484414-a4db-4717-8507-26f5296409dd', 'Beispiel Organisation');

    INSERT INTO "user_account_rel" (user_id, account_id, is_admin)
    VALUES
      ('5ecf4875-1311-4157-9af4-847581439690', '44484414-a4db-4717-8507-26f5296409dd', true),
      ('54be0d0d-9fc5-4f40-8c06-7509e219c1f8', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('6d948233-aa3c-4d3d-a9ed-7dafb2d8d454', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('081b3705-45cd-42c4-ac7e-f39a134625f1', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('8e82de9c-3031-4174-afb1-e4d8faa0b8e8', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('a72aaca2-6691-4637-987d-ca48ed041543', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('199fe9f8-249d-41c1-b217-7e093371de61', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('1b075520-c26c-4d31-9dba-1a22fa5ada3c', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('0eb8a59f-42ee-41ea-9dd8-897cbc6e6399', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('5ba021b7-b89f-4b51-b0ef-4bcffd746654', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('97c9a9fd-7da6-4741-b5b2-2e95a5dec2fb', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('9ec2b4a1-ebbc-4c49-ba56-fe37ac035fc', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('1df6f7b4-b145-4ac5-a494-7c2efed48cb0', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('05cf4055-50a8-41c6-9907-1ef12d5a45ff', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('6dc0c8b3-fb7b-4dce-9454-e225e60d4673', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('a8e3c3d7-cd4e-48b2-9e85-70a64f0e7e0f', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('ca8f96ce-7666-4707-b6f6-cca9af13f387', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('a5b5837c-e518-4e7a-9189-f40c4e76aec2', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('3b56aa5d-445c-4110-b27b-f37c4d9a6ac1', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('07db9b80-b9cf-4639-94cb-22da1f7edbdf', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('4c3d7edb-dab2-4228-a033-a90b8582ef47', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('0f3834bd-3e8f-4f5b-9105-eb37fc92d120', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('9b2a3fc6-cd10-4b03-ba91-be96f1fda6b4', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('be810a07-e2f6-4c91-9c21-6eb75fec8f5a', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('5e9d22f7-45f9-4083-b85a-e8351f679a0a', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('3cb52ec1-7dde-4b76-b578-2da98e353f4c', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('c8f97a3d-9462-43e9-ab69-aa5724bc1cc3', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('19e9da68-a2d9-415b-a78c-02e8327c8d41', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('2f482226-4b0d-4d2c-9f5f-e60bb1e68d02', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('71a5e679-90b9-4adb-82cb-04a131d76054', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('a5d8e6f6-6e30-45b0-9caf-460b16561d7a', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('d482479b-9c0d-4d00-8f94-bd0c8f1432f5', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('ac439d09-5ebd-4b5b-8a52-59e854190240', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('ecf27129-eb9c-4b0f-8d17-891f3b120b7e', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('d16bb3f4-6f34-4790-88e2-e9aa8c87e1e5', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('e69c4837-cd79-4064-a4bd-a7e2f9eba740', '44484414-a4db-4717-8507-26f5296409dd', false),
      ('7ca5c388-d5bd-4871-bd01-a330499357a0', '44484414-a4db-4717-8507-26f5296409dd', false);

    INSERT INTO "qualification" (id, account_id, name, abbreviation, color)
    VALUES
    ('02408990-10f5-4921-a874-d24c2ec682d4', '44484414-a4db-4717-8507-26f5296409dd', 'Truppmann', 'TM', '#FF3B30'),
    ('f4c6b77f-bba3-4e2a-9c78-0ea52e148d88', '44484414-a4db-4717-8507-26f5296409dd', 'Truppführer', 'TF', '#FF9500'),
    ('2052c1bd-3c0f-4e86-aa7e-c3aff95085ef', '44484414-a4db-4717-8507-26f5296409dd', 'Gruppenführer', 'GF', '#FFCC00'),
    ('e096f52a-0af3-4897-a158-a10b60db79fe', '44484414-a4db-4717-8507-26f5296409dd', 'Zugführer', 'ZF', '#34C759'),
    ('4b495910-6480-424c-8b7d-408d04063afa', '44484414-a4db-4717-8507-26f5296409dd', 'Atemschutzträger', 'AGT', '#00C7BE'),
    ('5dfe839f-94dc-4dfd-a3b0-81b265f7d0c8', '44484414-a4db-4717-8507-26f5296409dd', 'Maschinist', 'MA', '#007AFF');

    INSERT INTO "user_qualification_rel" (user_id, qualification_id, account_id)
    VALUES
      ('54be0d0d-9fc5-4f40-8c06-7509e219c1f8', '02408990-10f5-4921-a874-d24c2ec682d4', '44484414-a4db-4717-8507-26f5296409dd'),
      ('6d948233-aa3c-4d3d-a9ed-7dafb2d8d454', '02408990-10f5-4921-a874-d24c2ec682d4', '44484414-a4db-4717-8507-26f5296409dd'),
      ('081b3705-45cd-42c4-ac7e-f39a134625f1', '02408990-10f5-4921-a874-d24c2ec682d4', '44484414-a4db-4717-8507-26f5296409dd'),
      ('8e82de9c-3031-4174-afb1-e4d8faa0b8e8', '02408990-10f5-4921-a874-d24c2ec682d4', '44484414-a4db-4717-8507-26f5296409dd'),
      ('a72aaca2-6691-4637-987d-ca48ed041543', '02408990-10f5-4921-a874-d24c2ec682d4', '44484414-a4db-4717-8507-26f5296409dd'),
      ('199fe9f8-249d-41c1-b217-7e093371de61', '02408990-10f5-4921-a874-d24c2ec682d4', '44484414-a4db-4717-8507-26f5296409dd'),
      ('1b075520-c26c-4d31-9dba-1a22fa5ada3c', '02408990-10f5-4921-a874-d24c2ec682d4', '44484414-a4db-4717-8507-26f5296409dd'),
      ('0eb8a59f-42ee-41ea-9dd8-897cbc6e6399', '02408990-10f5-4921-a874-d24c2ec682d4', '44484414-a4db-4717-8507-26f5296409dd'),
      ('5ba021b7-b89f-4b51-b0ef-4bcffd746654', '02408990-10f5-4921-a874-d24c2ec682d4', '44484414-a4db-4717-8507-26f5296409dd'),
      ('97c9a9fd-7da6-4741-b5b2-2e95a5dec2fb', '02408990-10f5-4921-a874-d24c2ec682d4', '44484414-a4db-4717-8507-26f5296409dd'),
      ('9ec2b4a1-ebbc-4c49-ba56-fe37ac035fc', '02408990-10f5-4921-a874-d24c2ec682d4', '44484414-a4db-4717-8507-26f5296409dd'),
      ('1df6f7b4-b145-4ac5-a494-7c2efed48cb0', '02408990-10f5-4921-a874-d24c2ec682d4', '44484414-a4db-4717-8507-26f5296409dd'),
      ('05cf4055-50a8-41c6-9907-1ef12d5a45ff', '02408990-10f5-4921-a874-d24c2ec682d4', '44484414-a4db-4717-8507-26f5296409dd'),
      ('6dc0c8b3-fb7b-4dce-9454-e225e60d4673', '02408990-10f5-4921-a874-d24c2ec682d4', '44484414-a4db-4717-8507-26f5296409dd'),
      ('a8e3c3d7-cd4e-48b2-9e85-70a64f0e7e0f', '02408990-10f5-4921-a874-d24c2ec682d4', '44484414-a4db-4717-8507-26f5296409dd'),
      ('ca8f96ce-7666-4707-b6f6-cca9af13f387', '02408990-10f5-4921-a874-d24c2ec682d4', '44484414-a4db-4717-8507-26f5296409dd'),
      ('a5b5837c-e518-4e7a-9189-f40c4e76aec2', '02408990-10f5-4921-a874-d24c2ec682d4', '44484414-a4db-4717-8507-26f5296409dd'),
      ('3b56aa5d-445c-4110-b27b-f37c4d9a6ac1', '02408990-10f5-4921-a874-d24c2ec682d4', '44484414-a4db-4717-8507-26f5296409dd'),
      ('07db9b80-b9cf-4639-94cb-22da1f7edbdf', '02408990-10f5-4921-a874-d24c2ec682d4', '44484414-a4db-4717-8507-26f5296409dd'),
      ('4c3d7edb-dab2-4228-a033-a90b8582ef47', '02408990-10f5-4921-a874-d24c2ec682d4', '44484414-a4db-4717-8507-26f5296409dd'),
      ('5ecf4875-1311-4157-9af4-847581439690', '02408990-10f5-4921-a874-d24c2ec682d4', '44484414-a4db-4717-8507-26f5296409dd'),
      ('6dc0c8b3-fb7b-4dce-9454-e225e60d4673', 'f4c6b77f-bba3-4e2a-9c78-0ea52e148d88', '44484414-a4db-4717-8507-26f5296409dd'),
      ('199fe9f8-249d-41c1-b217-7e093371de61', '2052c1bd-3c0f-4e86-aa7e-c3aff95085ef', '44484414-a4db-4717-8507-26f5296409dd'),
      ('97c9a9fd-7da6-4741-b5b2-2e95a5dec2fb', 'e096f52a-0af3-4897-a158-a10b60db79fe', '44484414-a4db-4717-8507-26f5296409dd'),
      ('05cf4055-50a8-41c6-9907-1ef12d5a45ff', '4b495910-6480-424c-8b7d-408d04063afa', '44484414-a4db-4717-8507-26f5296409dd'),
      ('54be0d0d-9fc5-4f40-8c06-7509e219c1f8', '5dfe839f-94dc-4dfd-a3b0-81b265f7d0c8', '44484414-a4db-4717-8507-26f5296409dd');`

  await client.query(query)
  await client.query(query2)
  client.end()
}

resetDatabase()
  .then(() => console.log('Database reset successful'))
  .catch((error) => console.error('Database reset failed', error))