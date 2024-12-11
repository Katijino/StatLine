import requests
import sqlite3
import make_database
import pandas as pd
import random

def remake():
    make_database.make()
def ret():
    conn = sqlite3.connect("game_data.db")
    cursor = conn.cursor()
    # API URL
    API_URL = "https://site.web.api.espn.com/apis/personalized/v2/scoreboard/header?sport=basketball&league=nba&region=us&lang=en&contentorigin=espn&configuration=SITE_DEFAULT&platform=web&buyWindow=1m&showAirings=buy%2Clive%2Creplay&showZipLookup=true&tz=America%2FNew_York&postalCode=12180&authNetworks=espn3"

    # Fetch the API data
    response = requests.get(API_URL)

    # Check if the request was successful
    if response.status_code == 200:
        data = response.json()  # Parse JSON response
        
        # Access `events` inside the JSON response
        sports = data.get("sports", [])
        if sports:
            leagues = sports[0].get("leagues", [])
            if leagues:
                events = leagues[0].get("events", [])
                gameinfo = []  # Initialize the list to hold all game information
                
                for event in events:
                    game = []  # Initialize a list for the current game
                    game.append(event.get("id"))
                    
                    # Extract game link
                    links = event.get("links", [])
                    if links:
                        game.append(links[0].get("href", "N/A"))  # Game link
                    
                    # Extract competitors and their information
                    competitors = event.get("competitors", [])
                    if len(competitors) >= 2:
                        game.append(competitors[0].get("abbreviation", "N/A"))  # Team 1 abbreviation
                        game.append(competitors[0].get("logo", "N/A"))  # Team 1 logo
                        game.append(competitors[1].get("abbreviation", "N/A"))  # Team 2 abbreviation
                        game.append(competitors[1].get("logo", "N/A"))  # Team 2 logo
                    
                    # Extract additional game information
                    status = event.get("status")
                    if status == "pre":
                        # Records and time for pre-game
                        game.append(competitors[0].get("record"))  # Team 1 record
                        game.append(competitors[1].get("record"))  # Team 1 record
                        summary = event.get("summary", "")
                        time_part = summary.split(" - ")[1] if " - " in summary else "N/A"
                        game.append(time_part)  # Game time
                    elif status in ("in", "post"):
                        # Scores for in-progress or final games
                        game.append(competitors[0].get("score", "N/A"))  # Team 1 score
                        game.append(competitors[1].get("score", "N/A"))  # Team 2 score
                        game.append(event.get("summary", "N/A"))  # Game summary
                    
                    # Add the game to the gameinfo list
                    gameinfo.append(game)
                for game in gameinfo:
                    cursor.execute("""
                    INSERT OR REPLACE INTO game_data (
                        game_id, game_link, team1_abbr, team1_logo ,team2_abbr, team2_logo, team1_record_or_score,
                        team2_record_or_score, game_time_or_finished)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """, (game[0],game[1],game[2],game[3],game[4],game[5],game[6],game[7],game[8]))
                conn.commit()
            
                
    else:
        print(f"Failed to fetch data. Status code: {response.status_code}")
    conn.close()

def conference(team):
    team = team.upper()
    if team in ["ATL", "CHA", "MIA", "ORL", "WAS","BOS", "BKN", "NYK", "PHI", "TOR","CHI", "CLE", "DET", "IND", "MIL"]:
        return "East"
    return "West"

def division(team):
    team = team.upper()  # Ensure the input is case-insensitive

    if team in ["ATL", "CHA", "MIA", "ORL", "WAS"]:
        return "SE"
    elif team in ["BOS", "BKN", "NYK", "PHI", "TOR"]:
        return "ATL"
    elif team in ["CHI", "CLE", "DET", "IND", "MIL"]:
        return "CEN"
    elif team in ["DAL", "HOU", "MEM", "NOP", "SAS"]:
        return "SW"
    elif team in ["DEN", "MIN", "OKC", "POR", "UTA"]:
        return "NW"
    elif team in ["GSW", "LAC", "LAL", "PHX", "SAC"]:
        return "PAC"
    else:
        return "N/A"

def get_random_player_now():
    df = pd.read_csv("data/Player_Career_Info.csv")
    filtered_players = df[df['last_seas'] == 2025]
    random_player = filtered_players.sample(n=1)
    print(random_player)
    df = pd.read_csv("data/Player Season Info.csv")
    player_id = random_player.iloc[0]['player_id']
    player = df[(df['player_id'] == player_id) & (df['season'] == 2025)]
    print(player)
    team = player.iloc[0]['tm']
    div = division(team)
    conf = conference(team)
    position = player.iloc[0]['pos']
    df = pd.read_csv("data/Player Per Game.csv")
    player_stats = df[(df['player_id'] == player_id) & (df['season'] == 2025)]
    print(player_stats)
    name = player.iloc[0]['player']
    team = player.iloc[0]['tm']
    div = division(team)
    conf = conference(team)
    position = player.iloc[0]['pos']
    age = player_stats.iloc[0]['age']
    ppg = player_stats.iloc[0]['pts_per_game']
    apg = player_stats.iloc[0]['ast_per_game']
    rpg = player_stats.iloc[0]['trb_per_game']
    ret = [name,team,conf,div,position,age,ppg,apg,rpg]
    return ret






def get_list_of_players_first_name(query):
    """
    Filters players whose first name starts with the given query (case-insensitive).
    """
    # Read the CSV file
    df = pd.read_csv("data/Player_Career_Info.csv")

    # Filter players whose 'last_seas' is 2025
    filtered_players = df[df['last_seas'] == 2025]

    # Filter players by last name
    filtered_players = filtered_players[
        filtered_players['player']
        .str.lower().str.startswith(query.lower(), na=False)  # Case-insensitive filtering
    ]

    # Extract the player names into a list
    players = filtered_players['player'].tolist()

    # Print players for debugging
    print("Filtered Players by First Name:", players)

    # Return sorted player names
    return sorted(players)


def get_list_of_players_last_name(query):
    """
    Filters players whose last name starts with the given query (case-insensitive).
    """    
    # Read the CSV file
    df = pd.read_csv("data/Player_Career_Info.csv")

    # Filter players whose 'last_seas' is 2025
    filtered_players = df[df['last_seas'] == 2025]

    # Filter players by last name
    filtered_players = filtered_players[
        filtered_players['player']
        .str.split().str[1]  # Extract the last name
        .str.lower().str.startswith(query.lower(), na=False)  # Case-insensitive filtering
    ]

    # Extract the player names into a list
    players = filtered_players['player'].tolist()

    # Return sorted player names
    return sorted(players)

def get_player_by_name(name):
    df = pd.read_csv("data/Player_Career_Info.csv")
    filtered_players = df[df['last_seas'] == 2025]
    random_player = df[df['player'] == name]
    df = pd.read_csv("data/Player Season Info.csv")
    player_id = random_player.iloc[0]['player_id']
    player = df[(df['player_id'] == player_id) & (df['season'] == 2025)]
    print(player)
    team = player.iloc[0]['tm']
    div = division(team)
    conf = conference(team)
    position = player.iloc[0]['pos']
    df = pd.read_csv("data/Player Per Game.csv")
    player_stats = df[(df['player_id'] == player_id) & (df['season'] == 2025)]
    print(player_stats)
    name = player.iloc[0]['player']
    team = player.iloc[0]['tm']
    div = division(team)
    conf = conference(team)
    position = player.iloc[0]['pos']
    age = player_stats.iloc[0]['age']
    ppg = player_stats.iloc[0]['pts_per_game']
    apg = player_stats.iloc[0]['ast_per_game']
    rpg = player_stats.iloc[0]['trb_per_game']
    ret = [name,team,conf,div,position,age,ppg,apg,rpg]
    return ret



if __name__ == '__main__':
    s = get_player_by_name("Ja Morant")
