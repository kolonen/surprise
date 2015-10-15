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

@app.route("/authors", methods=['GET'])
def authors():
    authors = db.get_authors()
    authors_json = json.dumps(authors, indent=4)
    return flask.Response(authors_json, status=200, mimetype='application/json')

wager_authors_args = {
    'eventId': Arg(int),
    'author': Arg(str)
}

@app.route("/wager/authors", methods=['POST'])
def wager_authors():
    authors = flask.request.get_json(force=True)
    print authors
    for a in authors:
        db.update_event_author(a['eventId'], a['author'])
    return flask.Response({'success'}, status=200, mimetype='application/json')
    
@app.errorhandler(404)
def error_handler():
    message = {'Error: ' + flask.request.url}   
    return flask.Response(message, status=404, mimetype='application/json')
        
if __name__ == "__main__":
    app.run(debug=True)
