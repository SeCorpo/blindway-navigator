# Project Guide

## Code conventions:
    -2. For debug statements use console.log(DEBUG: class - function: message), mostly backend
    -1. Do not use var to initialize a variable
    0. Write variable/ function names in camelCase
    1. Volg de standaard (naming/coding) conventions (afspraken), zowel taal gerelateerd als team gerelateerd.
    2. Keep it simple stupid. Eenvoud is altijd beter. Reduceer complexiteit zoveel mogelijk.
    3. Zoek altijd naar de kernoorzaak van een probleem. Los het daar ook op.
    4. Vermijd meerdere malen van dezelfde code (duplicaten)
    5. Controleer altijd de waarden van onzekere bronnen, zoals bij I/O
    6. Schrijf altijd brackets om een een-regel block (zoals bij if, while)
    7. Wees consistent. Doe je iets op een bepaalde manier, doe het overal.
    8. Gebruik verklarende namen voor variabelen, zoals ‘naam=..’ en niet ‘n=..’
    9. Kies betekenisvolle en duidelijke namen voor bestanden, classes, methods, etc.
    10. Schrijf kleine methods/functies
    11. Doe één ding in een method/functies
    12. Maak jezelf begrijpelijk in code, zoals een verhaal. Gebruik comments wijselijk en beperkt.
    13. Verberg interne structuren in een class (encapsulation)
    14. Doe één ding in een class (abstraction)
    15. Gebruik een enkele assert per unit test case
    16. Schrijf alle code en comments in het Engels
    17. Review je code voor compile en run, weet wat je code doet
    18. Gebruik een versiebeheer systeem (zoals Git)
    19. Laat code schoner/cleaner achter dan dat je het vond
    20. Gebruik try-catch-finally
    21. Return geen null-waarden en geef deze ook niet door
    22. Throw exception met een heldere context/omschrijving
    23. Houd data en gedrag/logica gescheiden
    24. Gebruik datastructuren
    25. Geef de voorkeur aan non-static methods boven static methods
    26. Verwijder comment-out code
    27. Voorkom onjuiste informatie (in comments, change history, ...)

Zie: [W3 JavaScript Style Guide](https://www.w3schools.com/js/js_conventions.asp) && [Canvas - Clean code richtlijnen fase 2](https://canvas.hu.nl/courses/40098/files/3862575?wrap=1)

## Classes:
### backend:
    bin/www - starts up the node
    app.js - sets up all requirements and sets up different routes for a multipurpose server
    routes/planner.js - handles GET request to find traject-data (yes different routes are redundent atm)
    mysql_connection.js - creates a connection pool with mysql-database 'trajects', sends out querys to database
    ov_engine/build.js - algiritm to connect trajects till full route is found
    ov_engine/search.js - makes querys for finding trajects and traject-times
### frontend:
    planner-page/js/service.js - makes GET request to API
    routeinfo-page/js/tts.js - handles text to speech
    topbar.js - handles settings, page switches, used on all pages
    blindway.css - used on all pages, global styling file

## Frontend page structure:
    frontend/page-map ->
    ./js - separate functions
    index.html
    planner.js - all html handlings
    style.css

## Setup .env file:
    Create a new file named ".env"

    DB_HOST=localhost
    DB_USER=
    DB_PASSWORD=
    DB_DATABASE=

## Guidance to setup MySql:
    0. THIS EXACT SETUP ONLY WORKS ON LINUX
    1. install mysql
    2. "sudo mysql"
    3. "CREATE USER 'name'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';"
    4. "GRANT ALL PRIVILEGES ON *.* TO 'name'@'localhost' WITH GRANT OPTION;"
    5. "FLUSH PRIVILEGES;"
    6. make database "CREATE DATABASE trajects;"
    7. select database "USE trajects;"
    8. set source of database to project file "source /project/sql/trajects.sql right click, copy path > absolut;"

