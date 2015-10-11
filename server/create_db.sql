DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS wager;
DROP TABLE IF EXISTS user;

CREATE TABLE user(
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(16) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY (username)
);

CREATE TABLE wager(
  wager_id INT NOT NULL AUTO_INCREMENT,
  external_id VARCHAR(32),
  wager_date DATETIME,
  manager VARCHAR(16),
  system_size INT,
  stake INT,
  win_amount INT,
  PRIMARY KEY (wager_id),
  UNIQUE KEY (external_id),
  FOREIGN KEY (manager) REFERENCES user(username)
);

CREATE TABLE event(
  event_id INT NOT NULL AUTO_INCREMENT,
  wager_id INT NOT NULL,
  insert_date DATETIME,
  author VARCHAR(16),
  choose_home BOOLEAN DEFAULT false,
  choose_tie BOOLEAN DEFAULT false,
  choose_away BOOLEAN DEFAULT false,
  home_team VARCHAR(32),
  away_team VARCHAR(32),
  home_score INT,
  away_score INT,
  PRIMARY KEY (event_id),
  FOREIGN KEY (wager_id) REFERENCES wager(wager_id),
  FOREIGN KEY (author) REFERENCES user(username)
);


