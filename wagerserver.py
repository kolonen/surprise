from flask import Flask
from flask import Response
from flask import request
from database import database
import json

app = Flask(__name__)

@app.before_request
def db_connect():
    db = database()

@app.after_request
def db_disconnect(response):
  return response

@app.route("/")
def hello():
  return "Hello World!"

@app.route("/wagers", methods=['GET'])
def names():
    # todo: add database query here
  return "Hello World, here come wagers!"

if __name__ == "__main__":
  app.run()