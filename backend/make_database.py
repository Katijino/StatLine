import sqlite3

def make():
    # Connect to SQLite database (creates a file if it doesn't exist)
    conn = sqlite3.connect("game_data.db")

    # Create a cursor object to execute SQL commands
    cursor = conn.cursor()

    # Drop the table if it exists
    cursor.execute("DROP TABLE IF EXISTS game_data")

    # Create a new table
    cursor.execute("""
    CREATE TABLE game_data (
        game_id TEXT PRIMARY KEY,
        game_link TEXT,
        team1_abbr TEXT,
        team1_logo TEXT,
        team2_abbr TEXT,
        team2_logo TEXT,
        team1_record_or_score TEXT,
        team2_record_or_score TEXT,
        game_time_or_finished TEXT
    )
    """)

    # Commit changes to the database
    conn.commit()

    # Close the connection
    conn.close()


if __name__ == '__main__':
    make()
