import flask
from database import database
import json

app = flask.Flask(__name__)
db = database()

@app.route("/wagers", methods=['GET'])
def wagers():
    if 'manager' in flask.request.args:        
        wagers = db.get_manager_wagers(flask.request.args['manager'])
        wagers_json = json.dumps(map(lambda x: x.to_dict(   ), wagers), indent=4)
        return flask.Response(wagers_json, status=200, mimetype='application/json')
    else:
        wagers = db.get_wagers()
        wagers_json = json.dumps(map(lambda x: x.to_dict(),wagers), indent=4)
        print wagers_json
        return flask.Response(wagers_json, status=200, mimetype='application/json')
        
@app.route("/events", methods=['POST'])
def update_events():
    if 'events' in flask.request.json:
        for e in flask.request.json['events']:
            db.update_event_author(e['author'], e['id'])
        return flask.Response({'success'}, status=200, mimetype='application/json')
    else:
        message = {'Not Found: ' + flask.request.url}   
        return flask.Response(message, status=404, mimetype='application/json')
        
if __name__ == "__main__":
    app.run(debug=True)
