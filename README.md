# Canvas Instructure Notion Sync

# Getting Started

  Make sure you have Node 18.10.0 or greater (you're going to need to use the --fetch feature)
  
  Instructions to do so [are here](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/) (I prefer nvm but anything works)

 You're going to want to get a Canvas API key, the instructions to do so are in [this link](https://community.canvaslms.com/t5/Admin-Guide/How-do-I-obtain-an-API-access-token-in-the-Canvas-Data-Portal/ta-p/157).
 You'll also need a CanvasID which is your unique identified on Canvas, [found here](https://github.com/ubc/node-canvas-api), albeit in a very roundabout way
  In brief, run the `setup.js` file using `node .\setup.js` in the terminal and copy the ID that's printed into the terminal.

 After you do that, you're going to want to populate the empty `.env` file that's in the repository.
 The `SESSION` keyword is going to be in the format "2022W1" for example.
 
 ```
 CANVAS_API_TOKEN = <YOUR API TOKEN HERE>
 CANVAS_API_DOMAIN = https://ubc.instructure.com/api/v1 
 CANVAS_ID = <YOUR CANVAS ID>
 SESSION = <2022W1>
```

 Now to the Notion part, there are two options:
 
 ## Authenticating with OAuth
 [This link](https://api.notion.com/v1/oauth/authorize?client_id=3b180793-e3f0-4b9a-bb92-1d0a1150dc71&response_type=code&owner=user&redirect_uri=https%3A%2F%2Fgoogle.com) contains the authentication link for the Notion Integration. Follow the steps on screen and allow it access to the proper database where you want the data from the calendar to go.

 ## Alternate: Doing it Manually
 # Creating a Connection
 Follow [this guide](https://developers.notion.com/docs/getting-started) to create an integration. 
 
 # Database ID
 To get your database ID, instructions [are here](https://developers.notion.com/docs/working-with-databases#adding-pages-to-a-database) in the blue box where it says **where can I find my database ID**.
 Add that field to the `.env` as well:
 ```
 NOTION_KEY = <INTERNAL INTEGRATION KEY HERE>
 NOTION_DATABASE_ID = <YOUR NOTION DATABASE KEY HERE>
 ```
 
 On that same page, there's a box above the blue one labelled **Permissions**, you're going to need to follow the instructions to add the connection that you created in step 1 to your calendar.
 
 You're finally finished setup! To run the program, run the `run.bat` script and you should see your Canvas Calendar auto-populate into your Notion Database :D 
 
 # Automating the Script
 
 Personally, I make Windows run the script every day whenever my computer turns on. Here are the instructions to do so:
 1. Search up `Task Scheduler` in the Windows Menu
 2. Action -> Import Task -> Choose the `calendar.xml` file from the directory <br>
=> this creates a task that automatically runs every 24h, and if your computer is off then it'll run when your computer turns on next.
