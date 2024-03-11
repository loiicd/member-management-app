INSERT INTO "user" (id, firstname, lastname, birthdate, address, email, phone, password, passwordsalt, webaccess, searchvector)
VALUES
  ('54be0d0d-9fc5-4f40-8c06-7509e219c1f8', 'Max', 'Mustermann', '1990-01-15', 'Musterstraße 123, 12345 Musterstadt', 'max.mustermann@example.com', '+49 123 456789', null, null, false, to_tsvector('german', 'Max Mustermann 1990-01-15 Musterstraße 123, 12345 Musterstadt max.mustermann@example.com +49 123 456789')),
  ('6d948233-aa3c-4d3d-a9ed-7dafb2d8d454', 'Maria', 'Musterfrau', '1985-05-20', 'Musterweg 456, 54321 Musterstadt', 'maria.musterfrau@example.com', '+49 987 654321', null, null, false, to_tsvector('german', 'Maria Musterfrau 1985-05-20 Musterweg 456, 54321 Musterstadt maria.musterfrau@example.com +49 987 654321')),
  ('081b3705-45cd-42c4-ac7e-f39a134625f1', 'John', 'Doe', '1982-08-08', 'Doe Street 789, 67890 Doeville', 'john.doe@example.com', '+1 555 7890123', null, null, false, to_tsvector('german', 'John Doe 1982-08-08 Doe Street 789, 67890 Doeville john.doe@example.com +1 555 7890123')),
  ('8e82de9c-3031-4174-afb1-e4d8faa0b8e8', 'Alice', 'Jones', '1995-03-25', 'Jones Lane 456, 56789 Wonderland', 'alice.jones@example.com', '+44 20 12345678', null, null, false, to_tsvector('german', 'Alice Jones 1995-03-25 Jones Lane 456, 56789 Wonderland alice.jones@example.com +44 20 12345678')),
  ('a72aaca2-6691-4637-987d-ca48ed041543', 'Bob', 'Smith', '1988-11-10', 'Smith Road 789, 34567 Cityville', 'bob.smith@example.com', '+1 123 9876543', null, null, false, to_tsvector('german', 'Bob Smith 1988-11-10 Smith Road 789, 34567 Cityville bob.smith@example.com +1 123 9876543')),
  ('199fe9f8-249d-41c1-b217-7e093371de61', 'Eva', 'Miller', '1992-07-03', 'Miller Avenue 101, 54321 Townsville', 'eva.miller@example.com', '+61 2 34567890', null, null, false, to_tsvector('german', 'Eva Miller 1992-07-03 Miller Avenue 101, 54321 Townsville eva.miller@example.com +61 2 34567890')),
  ('1b075520-c26c-4d31-9dba-1a22fa5ada3c', 'David', 'Brown', '1980-04-18', 'Brown Street 222, 67890 Villeburg', 'david.brown@example.com', '+49 30 55555555', null, null, false, to_tsvector('german', 'David Brown 1980-04-18 Brown Street 222, 67890 Villeburg david.brown@example.com +49 30 55555555')),
  ('0eb8a59f-42ee-41ea-9dd8-897cbc6e6399', 'Sophie', 'Clark', '1998-09-12', 'Clark Lane 33, 45678 Parktown', 'sophie.clark@example.com', '+1 415 1112233', null, null, false, to_tsvector('german', 'Sophie Clark 1998-09-12 Clark Lane 33, 45678 Parktown sophie.clark@example.com +1 415 1112233')),
  ('5ba021b7-b89f-4b51-b0ef-4bcffd746654', 'Michael', 'White', '1984-06-30', 'White Road 77, 56789 Whitetown', 'michael.white@example.com', '+44 20 87654321', null, null, false, to_tsvector('german', 'Michael White 1984-06-30 White Road 77, 56789 Whitetown michael.white@example.com +44 20 87654321')),
  ('97c9a9fd-7da6-4741-b5b2-2e95a5dec2fb', 'Emma', 'Taylor', '1991-12-05', 'Taylor Street 555, 67890 Taylorville', 'emma.taylor@example.com', '+61 2 98765432', null, null, false, to_tsvector('german', 'Emma Taylor 1991-12-05 Taylor Street 555, 67890 Taylorville emma.taylor@example.com +61 2 98765432')),
  ('9ec2b4a1-ebbc-4c49-ba56-fe37ac035fc', 'Oliver', 'Anderson', '1987-02-22', 'Anderson Avenue 44, 34567 Andersonburg', 'oliver.anderson@example.com', '+49 40 12345678', null, null, false, to_tsvector('german', 'Oliver Anderson 1987-02-22 Anderson Avenue 44, 34567 Andersonburg oliver.anderson@example.com +49 40 12345678')),
  ('1df6f7b4-b145-4ac5-a494-7c2efed48cb0', 'Isabella', 'Wong', '1993-10-15', 'Wong Lane 888, 56789 Wongville', 'isabella.wong@example.com', '+1 408 5557890', null, null, false, to_tsvector('german', 'Isabella Wong 1993-10-15 Wong Lane 888, 56789 Wongville isabella.wong@example.com +1 408 5557890')),
  ('05cf4055-50a8-41c6-9907-1ef12d5a45ff', 'Daniel', 'Garcia', '1981-05-08', 'Garcia Street 777, 67890 Garciatown', 'daniel.garcia@example.com', '+34 91 23456789', null, null, false, to_tsvector('german', 'Daniel Garcia 1981-05-08 Garcia Street 777, 67890 Garciatown daniel.garcia@example.com +34 91 23456789')),
  ('6dc0c8b3-fb7b-4dce-9454-e225e60d4673', 'Sophia', 'Nguyen', '1997-01-28', 'Nguyen Road 222, 54321 Nguyenville', 'sophia.nguyen@example.com', '+84 24 98765432', null, null, false, to_tsvector('german', 'Sophia Nguyen 1997-01-28 Nguyen Road 222, 54321 Nguyenville sophia.nguyen@example.com +84 24 98765432')),
  ('a8e3c3d7-cd4e-48b2-9e85-70a64f0e7e0f', 'James', 'Lee', '1983-11-20', 'Lee Lane 666, 34567 Leeville', 'james.lee@example.com', '+82 2 34567890', null, null, false, to_tsvector('german', 'James Lee 1983-11-20 Lee Lane 666, 34567 Leeville james.lee@example.com +82 2 34567890')),
  ('ca8f96ce-7666-4707-b6f6-cca9af13f387', 'Ava', 'Hernandez', '1996-08-03', 'Hernandez Avenue 333, 67890 Hernandeztown', 'ava.hernandez@example.com', '+1 213 5551234', null, null, false, to_tsvector('german', 'Ava Hernandez 1996-08-03 Hernandez Avenue 333, 67890 Hernandeztown ava.hernandez@example.com +1 213 5551234')),
  ('a5b5837c-e518-4e7a-9189-f40c4e76aec2', 'Liam', 'Kim', '1989-03-12', 'Kim Street 111, 56789 Kimburg', 'liam.kim@example.com', '+82 2 98765432', null, null, false, to_tsvector('german', 'Liam Kim 1989-03-12 Kim Street 111, 56789 Kimburg liam.kim@example.com +82 2 98765432')),
  ('3b56aa5d-445c-4110-b27b-f37c4d9a6ac1', 'Charlotte', 'Martinez', '1994-09-25', 'Martinez Road 123, 54321 Martineztown', 'charlotte.martinez@example.com', '+34 93 87654321', null, null, false, to_tsvector('german', 'Charlotte Martinez 1994-09-25 Martinez Road 123, 54321 Martineztown charlotte.martinez@example.com +34 93 87654321')),
  ('07db9b80-b9cf-4639-94cb-22da1f7edbdf', 'Benjamin', 'Lopez', '1986-06-18', 'Lopez Lane 777, 67890 Lopeztown', 'benjamin.lopez@example.com', '+1 917 5556789', null, null, false, to_tsvector('german', 'Benjamin Lopez 1986-06-18 Lopez Lane 777, 67890 Lopeztown benjamin.lopez@example.com +1 917 5556789')),
  ('4c3d7edb-dab2-4228-a033-a90b8582ef47', 'Mia', 'Baker', '1999-02-10', 'Baker Avenue 444, 34567 Bakerville', 'mia.baker@example.com', '+61 2 12345678', null, null, false, to_tsvector('german', 'Mia Baker 1999-02-10 Baker Avenue 444, 34567 Bakerville mia.baker@example.com +61 2 12345678')),
  ('5ecf4875-1311-4157-9af4-847581439690', 'Admin', 'Admin', null, null, 'admin@example.com', null, '$2a$10$DOyVPpgyw2zUxyPl4I4Kpu5Dg73QcaimXXhHFBjd15qxzc2WPOzYW', '$2a$10$jR5kyQ2QHqtYYs2ZGD7bGO', true, to_tsvector('german', 'Admin Admin admin@example.com'));

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
  ('4c3d7edb-dab2-4228-a033-a90b8582ef47', '44484414-a4db-4717-8507-26f5296409dd', false);

INSERT INTO "qualification" (id, account_id, name, abbreviation)
VALUES
('02408990-10f5-4921-a874-d24c2ec682d4', '44484414-a4db-4717-8507-26f5296409dd', 'Truppmann', 'TM'),
('f4c6b77f-bba3-4e2a-9c78-0ea52e148d88', '44484414-a4db-4717-8507-26f5296409dd', 'Truppführer', 'TF'),
('2052c1bd-3c0f-4e86-aa7e-c3aff95085ef', '44484414-a4db-4717-8507-26f5296409dd', 'Gruppenführer', 'GF'),
('e096f52a-0af3-4897-a158-a10b60db79fe', '44484414-a4db-4717-8507-26f5296409dd', 'Zugführer', 'ZF'),
('4b495910-6480-424c-8b7d-408d04063afa', '44484414-a4db-4717-8507-26f5296409dd', 'Atemschutzträger', 'AGT'),
('5dfe839f-94dc-4dfd-a3b0-81b265f7d0c8', '44484414-a4db-4717-8507-26f5296409dd', 'Maschinist', 'MA');

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
  ('54be0d0d-9fc5-4f40-8c06-7509e219c1f8', '5dfe839f-94dc-4dfd-a3b0-81b265f7d0c8', '44484414-a4db-4717-8507-26f5296409dd');