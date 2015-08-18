import flask
from database import database
import json

app = flask.Flask(__name__)
db = database()

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/wagers", methods=['GET'])
def wagers():
    if 'manager' in flask.request.args:        
        wagers = db.get_wagers(flask.request.args['manager'])
        wagers_json = json.dumps(map(lambda x: x.to_dict(   ), wagers), indent=4)
        return flask.Response(wagers_json, status=200, mimetype='application/json')
    else:
        message = {'Not Found: ' + flask.request.url}   
        return flask.Response(message, status=404, mimetype='application/json')

@app.route("/events/<int:event_id>", methods=['PUT'])
def update_event(event_id):
    if 'author' in flask.request.json:
        #todo: last_id always zero, fix if possible with update query
        last_id = db.update_event_author(flask.request.json['author'], event_id)
        message = {"event id: " + str(last_id), "author: " + flask.request.json['author']}
        return flask.Response(message, status=200, mimetype='application/json')
    else:
        message = {'Not Found: ' + flask.request.url}   
        return flask.Response(message, status=404, mimetype='application/json')
    
if __name__ == "__main__":
    app.run(debug=True)