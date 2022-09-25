const canvasAPI = require('node-canvas-api')

const canvasDomain = process.env.CANVAS_API_DOMAIN

// canvasAPI.getSelf()
//   .then(self => console.log(self))

const canvasID = 593016

async function getCalendar() {
  let courses = await canvasAPI.getCoursesByUser(canvasID)
  let courseMap = new Map()
  for ( let i = 0 ; i < courses.length; i++ ) {
    if ( !courses[i].access_restricted_by_date || courses[i].access_restricted_by_date == null ) {
      courseMap.set(courses[i].course_code, courses[i].calendar.ics)
    }
  }
  return courseMap;
}

export default getCalendar