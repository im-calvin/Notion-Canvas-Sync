const {Client} = require('@notionhq/client');
const { get } = require('https');
const icsToCSV = require('./ics_to_csv');

const databaseID = process.env.NOTION_DATABASE_ID

const notion = new Client({
  auth: process.env.NOTION_KEY,
})

async function addItem(uid, assignmentDate, assignmentTitle) {
  try {
    const response = await notion.pages.create({
      parent: { 
      "type": "database_id", 
      "database_id": databaseID,
     },
      properties: {
        "Name": { 
          "title":[
            {
              "type": "text",
              "text": {
                "content": assignmentTitle
              }
            }
          ]
        },
        "Date": {
          "type": "date",
          "date": {
            "start": assignmentDate
          }
        },
        "Status": {
          "type": "select",
          "select": {
            "name": "Not Started",
            "color": "red"
          }
        },
        "uid": {
          "rich_text": [
            {
              "text": {
                "content": uid
              }
            }
          ]
        }

      },
    })
    console.log(response)
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
  }
}

async function main() {
  const uidMap = await icsToCSV();
  addItem('event-assignment-1354508', uidMap.get('event-assignment-1354508')[0], uidMap.get('event-assignment-1354508')[1])
}

main();