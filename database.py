import MySQLdb
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
            self.connection.rollback()
        return self.cursor.lastrowid


    def __query(self, query):
        cursor = self.connection.cursor( MySQLdb.cursors.DictCursor )
        cursor.execute(query)

        return cursor.fetchall()

    def __del__(self):
        self.connection.close()
        
    def save_wager(self, wager):
        query = "INSERT INTO wager (wager_date, manager, system_size, bet) VALUES (%s, %s, %s, %s)"
        data_wager = (wager.wager_date, wager.manager, wager.system_size, wager.bet)
        # insert wager, get last row id
        id = self.__insert(query, data_wager)
        print id
        # todo: insert events
