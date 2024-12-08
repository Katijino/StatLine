import requests

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
                elif status in ("in", "final"):
                    # Scores for in-progress or final games
                    game.append(competitors[0].get("score", "N/A"))  # Team 1 score
                    game.append(competitors[1].get("score", "N/A"))  # Team 2 score
                    game.append(event.get("summary", "N/A"))  # Game summary
                
                # Add the game to the gameinfo list
                gameinfo.append(game)
            
else:
    print(f"Failed to fetch data. Status code: {response.status_code}")
