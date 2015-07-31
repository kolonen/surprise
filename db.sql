CREATE TABLE wager(
  wager_id INT,
  wager_date DATETIME(3),
  manager VARCHAR(32),
  system_size INT,
  bet INT         
);

CREATE TABLE event(
  event_id INT,
  wager_id INT,
  insert_date DATETIME(3),
  author VARCHAR(32),
  choose_home BOOLEAN,
  choose_tie BOOLEAN,
  choose_away BOOLEAN,
  home_team VARCHAR(32),
  away_team VARCHAR(32),
  away_score INT,
  home_score INT
);
