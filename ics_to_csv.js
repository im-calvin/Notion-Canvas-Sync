const getCalendar = require('./canvas')
const fs = require('fs')
const https = require('https');

async function icsToCSV () {
  courseMap = getCalendar();

  courseMap.array.forEach(courseName, courseICS => {
  
  });

  for ( var [courseName, ics] of courseMap.entries()) {
    courseMap.forEach(function(courseName, ics) { 
      https.get(ics, (res) => {
        const path = `/files/${courseName}.ics`;
        const filePath = fs.createWriteStream(path);
        res.pipe(filePath);
        filePath.on('finish', () => {
          filePath.close();
          console.log('Download Completed');
        })
      })
    })
    }
}


