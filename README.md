# Canvas Instructure Notion Sync

# Getting Started

  Make sure you have Node 18.10.0 or greater (you're going to need to use the --fetch feature)
  
  Instructions to do so [are here](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/) (I prefer nvm but anything works)

 You're going to want to get a Canvas API key, the instructions to do so are in [this link](https://community.canvaslms.com/t5/Admin-Guide/How-do-I-obtain-an-API-access-token-in-the-Canvas-Data-Portal/ta-p/157)

 After you do that, you're going to want to populate the empty `.env` file that's in the repository.
 
 ```
 CANVAS_API_TOKEN = <YOUR API TOKEN HERE>
 CANVAS_API_DOMAIN = https://ubc.instructure.com/api/v1 
```

 Now to the Notion part, there are two parts:
 
 ## Creating a Connection
 Follow [this guide](https://developers.notion.com/docs/getting-started) to create an integration. 
 
 ## Database ID
 To get your database ID, instructions [are here](https://developers.notion.com/docs/working-with-databases#adding-pages-to-a-database) in the blue box where it says **where can I find my database ID**.
 Add that field to the `.env` as well:
 ```
 NOTION_KEY = <INTERNAL INTEGRATION KEY HERE>
 NOTION_DATABASE_ID = <YOUR NOTION DATABASE KEY HERE>

 ```
 
 On that same page, there's a box above the blue one labelled **Permissions**, you're going to need to follow the instructions to add the connection that you created in step 1 to your calendar.
 
 You're finally finished setup! To run the program, run the `run.bat` script and you should see your Canvas Calendar auto-populate into your Notion Database :D 
