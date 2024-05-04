CREATE TABLE rooms (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  category TEXT,
  price NUMERIC,
  status TEXT
);

CREATE TABLE bookings (
  code TEXT PRIMARY KEY,
  room_id INTEGER,
  email TEXT,
  checkin NUMERIC,
  checkout NUMERIC,
  duration NUMERIC,
  price NUMERIC,
  status TEXT
);

INSERT INTO rooms (category, price, status) VALUES ('suite', 500, 'available'), ('suite', 500, 'available'), ('standard', 300, 'available'), ('standard', 300, 'maintenance');
