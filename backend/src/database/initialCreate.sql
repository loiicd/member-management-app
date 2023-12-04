CREATE TABLE user (
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
  PRIMARY KEY (id)
)