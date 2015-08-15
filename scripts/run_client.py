import os, sys
sys.path.append(os.path.abspath(os.path.join('..')))
sys.path.append(os.path.abspath(os.path.join('.')))
import surprise
import wager_client as wc
import database
import requests
import json
import sys
import time


if __name__ == "__main__":    
    s = wc.login(sys.argv[1], sys.argv[2])
    wagers = wc.get_wagers(s)
    db = database.database()
    for w in wagers:
        db.save_wager(w)
    
    w = db.get_wagers("Mixu Paatelainen")[0]
    print w.wager_id
    print w.wager_date
    for e in w.events:
        print e.home_team, e.away_team, e.home_score, e.away_score
    
