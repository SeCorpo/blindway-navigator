Welcome to this Intellij generated

EXPRESS NODEJS project

Express has advantages, namely:
-server side rendering using pug-engine (HTML generating engine)
-clear file structure (separating global instructions (app js)
    from routes (individual pages)
-app js has standard error handling integrated


==CLASSES

    build.js
    "build a route from start_station_name_journey > end_station_name_journey @ startTime from up to three train_tracks"
    Handles transfertime

    search.js
    makes a query for a train_track row based on: start_station_name, startTime.
    Adds a param for startTime + 1 hour.

    mysql_connection.js
    Connects to the database using mysql server connection, requires .env information file


==SETTING UP MYSQL
1. install mysql
2. "sudo mysql"
3. "CREATE USER 'name'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';"
4. "GRANT ALL PRIVILEGES ON *.* TO 'sammy'@'localhost' WITH GRANT OPTION;"
5. "FLUSH PRIVILEGES;"
6. make database "CREATE DATABASE trajects;"
7. select database "USE trajects;"
8. set source of database to project file "source /project/sql/trajects.sql right click, copy path > absolut;"


==SETTING UP .ENV
    Create a new file named ".env"
    PASTE:

DB_HOST=localhost
DB_USER=
DB_PASSWORD=
DB_DATABASE=

