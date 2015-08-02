CREATE TABLE wager(
  wager_id INT,
  wager_date DATETIME,
  manager VARCHAR(32),
  system_size INT,
  bet INT         
);

CREATE TABLE event(
  event_id INT,
  wager_id INT,
  insert_date DATETIME,
  author VARCHAR(32),
  choose_home BOOLEAN DEFAULT false,
  choose_tie BOOLEAN DEFAULT false,
  choose_away BOOLEAN DEFAULT false,
  home_team VARCHAR(32),
  away_team VARCHAR(32),
  home_score INT,
  away_score INT
);
