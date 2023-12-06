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

CREATE INDEX searchvectorindex ON "user" USING gin(searchvector);