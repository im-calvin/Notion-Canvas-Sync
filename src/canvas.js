const canvasAPI = require("node-canvas-api");

const canvasDomain = process.env.CANVAS_API_DOMAIN;

const canvasID = process.env.CANVAS_ID

// @param session is in the format '2022W1'
async function getCalendar(session) {
  let courses = await canvasAPI.getCoursesByUser(canvasID);
  let courseMap = new Map();
  for (let i = 0; i < courses.length; i++) {
    if (
      !courses[i].access_restricted_by_date ||
      courses[i].access_restricted_by_date == null
    ) {
      if (courses[i].course_code.includes(session)) {
        courseMap.set(courses[i].course_code, courses[i].calendar.ics);
      }
    }
  }
  return courseMap;
}

module.exports = getCalendar;
