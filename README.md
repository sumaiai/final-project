Research Awards Search System
Overview
This is a front-end web application that allows users to search and explore research awards stored in XML files. The application dynamically loads award data from multiple XML files listed in a JSON file, supports filtering by state, agency, and date, and provides detailed pages for each award.

Features
Dynamically loads XML award data from award-list.json.

Filters awards by state, agency, and start date.

Displays results in a searchable, sortable table.

Each award links to a detailed page showing full award information.

Easy to add new awards by updating the XML folder and JSON file.

Project Structure:
/xml/             # Folder containing award XML files (e.g., award1.xml)    
main.html        # Main page with search and filters  
award.html       # Detail page for individual awards  
script.js        # JavaScript for main page functionality  
award.js         # JavaScript for detail page functionality  
award-list.json  # JSON file listing all XML award files dynamically  
README.md        # This file  

How to Run
Run a local HTTP server in the project root folder.VS Code Live Server or run can be used:

Open http://localhost:8000/main.html (or the port your server uses) in a modern browser.

Use the filters to search for awards. Click an award title to view detailed information.

Adding New Awards
Add your new award XML file to the /xml/ folder. Name it as awardN.xml (e.g., award6.xml).

Open award-list.json and add the new XML file path inside the array, like:

json
[
  "xml/award1.xml",
  "xml/award2.xml",
  ...
  "xml/award6.xml"
]
Reload the main page. Your new award will appear automatically.

Notes
The award1.html, award2.html, etc., are auxiliary files related to the front page map only and do not affect the main search functionality.

This project is fully client-side and requires a local server due to browser security restrictions on loading local files.