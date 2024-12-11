from time import sleep
from flask import Flask, jsonify, request
import retrieve
import sqlite3
app = Flask(__name__)

def get_db_conn():
    conn = sqlite3.connect("game_data.db")
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/header/reset_games',methods=['GET'])
def reset():
    retrieve.remake()
    sleep(1)

@app.route('api/header/GTP/Specific',methods=['GET'])
def get_specific_player():
    query = request.args.get('name',None)
    first_players = retrieve.get_list_of_players_first_name()
    last_player = retrieve.get_list_of_players_last_name()
    sorted = sorted(first_players)+sorted(last_player)
    return jsonify({"players":sorted})



@app.route('/api/games/GTP', methods=['GET'])
def get_random_player():
    # Get the player data as a list
    l = retrieve.get_random_player_now()

    # Convert the list into a dictionary for clarity and structure
    player_data = {
        "name": l[0],
        "team": l[1],
        "conference": l[2],
        "division": l[3],
        "position": l[4],
        "age": l[5],
        "ppg": l[6],
        "apg": l[7],
        "rpg": l[8]
    }

    # Return the dictionary as a JSON response
    return jsonify(player_data)



@app.route('/api/games/HigherLower', methods =['GET'])
def get_two_players():
    return



@app.route('/api/games/StatLineGuesser', methods =['GET'])
def get_random_statline():
    return


@app.route('/api/games/StatOfTheDay', methods =['GET'])



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