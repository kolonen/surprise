import flask
from database import database
import json

app = flask.Flask(__name__)
db = database()

@app.route("/wagers", methods=['GET'])
def wagers():
    params = {}
    if 'manager' in flask.request.args:
        params.update({'manager': flask.request.args['manager']})
    if 'size' in flask.request.args:
        if flask.request.args['size'].isdigit():
            params.update({'size': int(flask.request.args['size'])})
            if 'offset' in flask.request.args:
                if flask.request.args['offset'].isdigit():
                    params.update({'offset': int(flask.request.args['offset'])})
                else:
                    return error_handler()
        else:
            return error_handler()
    # no offset without size allowed
    elif 'offset' in flask.request.args:
        return error_handler()
    
    wagers = db.get_wagers(**params)
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
