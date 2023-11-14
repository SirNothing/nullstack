SequenceDiagram
    participant browser
    participant server

    browser->>server: GET https:studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->browser:  the HTML file
    deactivate server

    Note right to browser: browser reads the html and loads the needed files and run them

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right to browser: browser loads the JavaScript file, executes it and fetches JSON
    browser->>server: GET http://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>btowser: fetch the JSON file from JavaScript
    deactivate server
SequenceDiagram

