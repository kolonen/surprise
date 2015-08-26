import MySQLdb
import sys
import surprise
from datetime import datetime

class database:

    host = 'localhost'
    user = 'root'
    password = ''
    db = 'surprise'

    def __init__(self):
        self.connection = MySQLdb.connect(self.host, self.user, self.password, self.db)
        self.cursor = self.connection.cursor()

    def __insert(self, query, data):
        try:
            self.cursor.execute(query, data)
            self.connection.commit()
        except:
            print sys.exc_info()[0]
            self.connection.rollback()
        return self.cursor.lastrowid

    def __query(self, query, data):
        cursor = self.connection.cursor( MySQLdb.cursors.DictCursor )
        
        cursor.execute(query, data) if data is not None else cursor.execute(query)
        return cursor.fetchall()

    def __del__(self):
        self.connection.close()
        
    def save_wager(self, wager):
        wager_id = self.__insert("INSERT INTO wager (wager_date, external_id, manager, system_size, stake, win_amount) VALUES (%s, %s, %s, %s, %s, %s)", 
                           (wager.wager_date, wager.ext_id, wager.manager, wager.system_size, wager.stake, wager.win_amount))
        for e in wager.events:
            self.__insert("INSERT INTO event(wager_id, choose_home, choose_tie, choose_away, home_team, away_team, away_score, home_score) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", 
                          (wager_id, e.choose_home, e.choose_tie, e.choose_away, e.home_team, e.away_team,e.away_score, e.home_score))
        

    def get_wagers(self, limit, offset):
    
        def wager_from_row(r):
            return surprise.wager(wager_id = r['wager_id'],
                  wager_date = r['wager_date'], 
                  ext_id = r['external_id'],
                  stake = r['stake'], 
                  system_size = r['system_size'],
                  manager = r['manager'],
                  win_amount = r['win_amount'],
                  events = self.get_events(r['wager_id']))
        
        query = "SELECT wager_id, external_id, wager_date, manager, system_size, stake, win_amount FROM wager LIMIT %s OFFSET %s"
        rows = self.__query(query, (limit, offset))
        wagers = map(lambda x: wager_from_row(x), rows)
        return wagers

    
    def get_events(self, wager_id):
        
        def event_from_row(r):
            return surprise.event(event_id = r['event_id'],
                           wager_id = r['wager_id'],
                           choose_home = r['choose_home'], 
                           choose_tie = r['choose_tie'],
                           choose_away = r['choose_away'],
                           home_team = r['home_team'],
                           away_team = r['away_team'],
                           home_score = r['home_score'],
                           away_score = r['away_score'],
                           author = r['author'])
        
        rows = self.__query("SELECT event_id, wager_id, choose_home, choose_tie, choose_away, home_team, away_team, away_score, home_score, author FROM event WHERE wager_id = %s", [wager_id])
        return map(lambda r: event_from_row(r), rows)
        
    def update_event_author(self, author, event_id):
        return self.__insert("UPDATE event SET author=%s WHERE event_id=%s", (author, event_id))
