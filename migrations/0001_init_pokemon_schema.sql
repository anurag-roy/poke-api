-- Drop leftover schema from an earlier unused D1 experiment (empty tables).
DROP TABLE IF EXISTS pokemon_ability;
DROP TABLE IF EXISTS pokemon_location;
DROP TABLE IF EXISTS pokemon_stat;
DROP TABLE IF EXISTS pokemon_type;
DROP TABLE IF EXISTS ability;
DROP TABLE IF EXISTS location;
DROP TABLE IF EXISTS pokemon;
DROP TABLE IF EXISTS stat;
DROP TABLE IF EXISTS type;

CREATE TABLE pokemon (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL COLLATE NOCASE UNIQUE,
  detail TEXT NOT NULL
);

CREATE TABLE meta (
  key TEXT PRIMARY KEY NOT NULL,
  value TEXT NOT NULL
);
