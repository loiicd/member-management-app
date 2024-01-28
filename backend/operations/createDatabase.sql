DROP TABLE IF EXISTS "user_operational_qualification" CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "operational_qualification" CASCADE;
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
  password text,
  passwordsalt text, 
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

CREATE TABLE "operational_qualification" (
  id text NOT NULL,
  name text NOT NULL,
  abbreviation text,
  PRIMARY KEY (id)
);

CREATE TABLE "user_operational_qualification" (
  user_id text NOT NULL,
  operational_qualification_id text NOT NULL,
  PRIMARY KEY (user_id, operational_qualification_id),
  FOREIGN KEY (user_id) REFERENCES "user" (id),
  FOREIGN KEY (operational_qualification_id) REFERENCES "operational_qualification" (id)
);

CREATE INDEX searchvectorindex ON "user" USING gin(searchvector);