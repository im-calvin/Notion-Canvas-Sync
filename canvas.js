const canvasAPI = require('node-canvas-api')
const fs = require('fs')
const { courses } = require('node-canvas-api/src/internal/getOptions')

const canvasDomain = process.env.CANVAS_API_DOMAIN

// canvasAPI.getSelf()
//   .then(self => console.log(self))

let canvasID = 593016

courses = await canvasAPI.getAllCoursesInAccount(canvasID)
var courseList = []
for ( let i = 0; i < courses.length; i++) {
  courseList.concat(courses.id)
}


// canvasAPI.getAssignments() 