DROP TABLE IF EXISTS "user_qualification_rel" CASCADE;
DROP TABLE IF EXISTS "user_account_rel" CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "qualification" CASCADE;
DROP TABLE IF EXISTS "account" CASCADE;

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

CREATE INDEX searchvectorindex ON "user" USING gin(searchvector);