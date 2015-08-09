import MySQLdb
import sys
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
       # try:
        self.cursor.execute(query, data)
        self.connection.commit()
        #except:
        #    print sys.exc_info()[0]
        #    self.connection.rollback()
        return self.cursor.lastrowid


    def __query(self, query):
        cursor = self.connection.cursor( MySQLdb.cursors.DictCursor )
        cursor.execute(query)
        return cursor.fetchall()

    def __del__(self):
        self.connection.close()
        
    def save_wager(self, wager):
        query = "INSERT INTO wager (wager_date, external_id, manager, system_size, stake, win_amount) VALUES (%s, %s, %s, %s, %s, %s)"
        # insert wager, get last row id
        id = self.__insert(query, (wager.wager_date, wager.ext_id, wager.manager, wager.system_size, wager.stake, wager.win_amount))
        print id
        query = "INSERT INTO event(wager_id, choose_home, choose_tie, choose_away, home_team, away_team, away_score, home_score) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        
        for e in wager.events:
            print e
            self.__insert(query, (id, e.choose_home, 
                                  e.choose_tie, e.choose_away, 
                                  e.home_team, e.away_team,
                                  e.away_score, e.home_score))
        
     
