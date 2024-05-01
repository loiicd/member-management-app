# Database

## User

Aktuell:
|                | Type      |          |        |             | Default          |
| -------------- | --------- | -------- | ------ | ----------- | ---------------- |
| id             | text      | NOT NULL |        | PRIMARY KEY |                  |
| firstname      | text      | NOT NULL |        |             |                  |
| lastname       | text      | NOT NULL |        |             |                  |
| birthdate      | date      |          |        |             |                  |
| address        | text      |          |        |             |                  |
| email          | text      |          |        |             |                  |
| phone          | text      |          |        |             |                  |
| login_email    | text      |          | UNIQUE |             |                  |
| password       | text      |          |        |             |                  |
| passwordsalt   | text      |          |        |             |                  |
| is_online_user | boolean   | NOT NULL |        |             |                  |
| webaccess      | boolean   | NOT NULL |        |             |                  | 
| version        | integer   | NOT NULL |        |             | 0                |
| created_at     | timestamp | NOT NULL |        |             | now()::timestamp |
| updated_at     | timestamp | NOT NULL |        |             | now()::timestamp |