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
    #todo: get manager name from request
    wagers = db.get_wagers("Mixu Paatelainen")
    wagers_json = json.dumps(map(lambda x: x.to_dict(   ), wagers), indent=4)
    return flask.Response(wagers_json, status=200, mimetype='application/json')
     
if __name__ == "__main__":
    app.run(debug=True)