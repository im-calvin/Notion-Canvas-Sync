const {Client} = require('@notionhq/client')
import getCalendar from './canvas'

const databaseID = process.env.NOTION_DATABASE_ID

const notion = new Client({
  auth: process.env.NOTION_KEY,
})

async function addItem(assignmentTitle, assignmentDate) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
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
          "date": {
            "start": assignmentDate
          }
        },
        "Status": {
          "status": {
            "name": "Not Started"
          }
        }

      },
    })
    console.log(response)
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
  }
}

addItem("Yurts in Big Sur, California")