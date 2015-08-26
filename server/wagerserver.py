import flask
from database import database
import json
from webargs import Arg
from webargs.flaskparser import use_args

app = flask.Flask(__name__)
db = database()

wager_args = {
  'limit': Arg(int, default=10000),
  'offset': Arg(int, default=0)
}

@app.route("/wagers", methods=['GET'])
@use_args(wager_args)
def wagers(args):
    wagers = db.get_wagers(args['limit'], args['offset'])
    wagers_json = json.dumps(map(lambda x: x.to_dict(   ), wagers), indent=4)
    return flask.Response(wagers_json, status=200, mimetype='application/json')

@app.route("/events", methods=['POST'])
def update_events():
    if 'events' in flask.request.json:
        for e in flask.request.json['events']:
            db.update_event_author(e['author'], e['id'])
        return flask.Response({'success'}, status=200, mimetype='application/json')
    else:
        message = {'Error: ' + flask.request.url}   
        return flask.Response(message, status=404, mimetype='application/json')

@app.errorhandler(404)
def error_handler():
    message = {'Error: ' + flask.request.url}   
    return flask.Response(message, status=404, mimetype='application/json')
        
if __name__ == "__main__":
    app.run(debug=True)
