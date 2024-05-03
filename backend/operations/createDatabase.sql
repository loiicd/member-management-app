DROP TABLE IF EXISTS "user_qualification_rel" CASCADE;
DROP TABLE IF EXISTS "user_account_rel" CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "qualification" CASCADE;
DROP TABLE IF EXISTS "account" CASCADE;
DROP TABLE IF EXISTS "user_session" CASCADE;
DROP TABLE IF EXISTS "group" CASCADE;
DROP TABLE IF EXISTS "user_group_rel" CASCADE;

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

CREATE INDEX searchvectorindex ON "user" USING gin(searchvector);