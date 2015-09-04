import json
import copy

class event(object):
    def __init__(self, 
                 event_id=None,
                 wager_id=None, 
                 row_id=None,
                 insert_date=None, 
                 author=None, 
                 choose_home=False, 
                 choose_tie=False, 
                 choose_away=False,
                 home_team=None,
                 away_team=None,
                 away_score=0,
                 home_score=0):
        
        self.event_id = event_id
        self.wager_id = wager_id
        self.row_id = row_id
        self.insert_date = insert_date
        self.author = author
        self.choose_home = choose_home 
        self.choose_tie = choose_tie 
        self.choose_away = choose_away 
        self.home_team = home_team
        self.away_team = away_team
        self.home_score = home_score
        self.away_score = away_score

class wager(object):
    def __init__(self,
                 wager_id=None,
                 ext_id=None,
                 wager_date=None,
                 manager=None,
                 system_size=1,
                 stake=None,
                 win_amount=None,
                 events=None,
                 hits=0):
        
        self.wager_id = wager_id
        self.ext_id = ext_id
        self.wager_date = wager_date
        self.manager = manager
        self.system_size = system_size
        self.stake = stake
        self.win_amount = win_amount
        self.events = events
        self.hits = hits
    
    def to_dict(self):
        d = copy.deepcopy(self.__dict__)
        d['wager_date'] = str(self.wager_date )
        d['events'] = map(lambda x: x.__dict__, d['events'])
        return d
    