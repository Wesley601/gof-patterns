CREATE TABLE grades (
  student_id TEXT,
  exam TEXT,
  value NUMERIC
);

create table average (
  student_id TEXT UNIQUE,
  value NUMERIC
);
