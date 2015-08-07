import requests
import json
import sys
import surprise
import time
import MySQLdb
from database import database
from surprise import wager
from datetime import datetime

headers = {
    'Content-type':'application/json',
    'Accept':'application/json',
    'X-ESA-API-Key':'ROBOT'
}

def login (username, password):
    s = requests.Session()
    login_req = {"type":"STANDARD_LOGIN","login":username,"password":password}
    r = s.post("https://www.veikkaus.fi/api/v1/sessions", data=json.dumps(login_req), headers=headers)
    if r.status_code == 200:
        return s
    else:
        raise Exception("Authentication failed", r.status_code)    

def get_tx_ids(session):
    r = session.get('https://www.veikkaus.fi/api/v1/players/self/account/transactions?size=10&sort-by=RESULT_DATE', headers=headers)
    txs = r.json()['transactions']
    return map(lambda x: x['externalId'], txs)
    
def get_wagers(session, txs):
    
    def get_wager(session, tx_id):
        r = session.get('https://www.veikkaus.fi/api/v1/sport-games/wagers/'+tx_id, headers=headers)
        print json.loads(r.text)
        print "--------------------------"
        return json.loads(r.text)

    def parse_selection(s):
        return {'home': (True if 'home' in s else False), 
                'tie': (True if 'tie' in s else False),
                'away': (True if 'away' in s else False) 
        }
        
    def parse_wager(w):
        #parse selections
        rawSelections = w['wager']['selections'][0]['outcomes']
        selections = enumerate(map(lambda s: parse_selection(s), rawSelections)) 
        selections = map(lambda (i, s): (i,s), selections) 
    
        #make dictionary with id as a key for easy addressing 
        #(even though the array is probably in order anyway) 
        rows = dict(map(lambda r: (int(r['id']), r), w['draw']['rows']))
    
        events = map(lambda (i,s): 
                     surprise.event(
                         row_id=i,
                         choose_home=s['home'],
                         choose_tie=s['tie'],
                         choose_away=s['away'],
                         home_team=rows[i]['outcome']['home']['name'],
                         away_team=rows[i]['outcome']['away']['name'],
                         home_score=rows[i]['result']['score']['home'],
                         away_score=rows[i]['result']['score']['away']
                     ), selections)
    
        #parse wager high level data, create wager
        

        return surprise.wager(wager_date = datetime.now(), manager = "Mixu Paatelainen", bet = 16, events=events)

    wagers = map(lambda x: get_wager(session,x), txs)
    wagers = filter(lambda x: 'draw' in x and x['draw']['gameName'] == 'SPORT', wagers)
    wagers = map(lambda w: parse_wager(w),wagers)
    
    return wagers


def store_wager(wager):
    db = database()
    db.save_wager(wager)
    
if __name__ == "__main__":    
    s = login(sys.argv[1], sys.argv[2])
    tx_ids = get_tx_ids(s)
    wagers = get_wagers(s,tx_ids)
    #for e in w.events:
    #    print e.row_id,e.home_team,e.home_score, e.away_team, e.away_score
    #    print e.choose_home, e.choose_tie, e.choose_away
    
    # test wager insert
    new_wager = wager(wager_date = datetime.now(), manager = "Mixu Paatelainen", bet = 16)
    for w in wagers:
        store_wager(w)

