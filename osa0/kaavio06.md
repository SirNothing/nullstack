sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
        Content-Type: application/json
        Payload: [{ "content": "mjau", "date": "2023-11-14T12:31:23:731Z" }]
    activate server
    server-->>browser: JSON response {"message": "note created"}
    deactivate server

    Note right to browser: browser will send the form data as a application/json to the server. server won't need to redirect as browser updates the list from javascript code.

sequenceDiagram
