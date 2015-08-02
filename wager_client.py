import requests
import json
import sys


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
        return json.loads(r.text)

    w = map(lambda x: get_wager(session,x), txs) 
    
    rows = w['draw']['rows']
    selections = w['wager']['selections'][0]['outcomes']
    


def store_wager():
    print ''

if __name__ == "__main__":    
    s = login(sys.argv[1], sys.argv[2])
    r = get_tx_ids(s)
    print r

    
    


