from time import sleep
from flask import Flask, jsonify, request
import retrieve
import sqlite3
app = Flask(__name__)

def get_db_conn():
    conn = sqlite3.connect("game_data.db")
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/header',methods = ['GET'])
def get_all_games():
    retrieve.ret()
    sleep(1)
    conn = get_db_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM game_data")
    games = cursor.fetchall()
    result = [dict(game) for game in games]
    conn.close()
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)