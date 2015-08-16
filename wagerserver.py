from flask import Flask
from flask import Response
from flask import request
from database import database
import json

app = Flask(__name__)
db = database()

@app.after_request
def returnresp(response):
    return response

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/wagers", methods=['GET'])
def wagers():
    def dict_from_wager(w):
        d = {"wager_id" : w.wager_id,
        "ext_id" : w.ext_id,
        "wager_date" : str( w.wager_date ),
        "manager" : w.manager,
        "system_size" : w.system_size,
        "stake" : w.stake,
        "win_amount" : w.win_amount,
        "events" : []}

        for e in w.events:
            d['events'].append(e.__dict__)
        return d
    #todo: get manager name from request
    wagers = db.get_wagers("Mixu Paatelainen")
    d = []
    for wager in wagers:
        d.append( dict_from_wager(wager) )
    data = json.dumps(d, indent=4)
    resp = Response(data, status=200, mimetype='application/json')
    return resp
        
if __name__ == "__main__":
    app.run(debug=True)