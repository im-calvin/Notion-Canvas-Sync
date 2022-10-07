const { getCalendar } = require('./src/canvas')
const fs = require('fs');
const https = require('https');

function parseToMap(icsStr) {
  let uidMap = new Map();

  while (icsStr.search("BEGIN:VEVENT") != -1) {
    icsStr = icsStr.substring(icsStr.search("UID:"));
    
    let uid = icsStr.substring(4, icsStr.search('\r'));
    
    icsStr = icsStr.substring(icsStr.search("DTSTART"));
    
    let dtStart = icsStr.substring(8, icsStr.search('\r'));
    
    if (dtStart.startsWith('V')) {
      dtStart = dtStart.substring(22, icsStr.search('\r'));
    }

    icsStr = icsStr.substring(icsStr.search("SUMMARY:"));

    let summary = icsStr.substring(8, icsStr.search('\r'));

    uidMap.set(uid, [dtStart, summary]);

    return uidMap;
  }
}

async function icsToCSV() {
  const session = '2022W1';
  const pageMap = await getCalendar(session);

  for (let entry of pageMap.entries()) {
    let code = entry[0].replaceAll(' ', '_').replaceAll('/', '');
    let ics = entry[1];
    // console.log(ics);

    let filePath = `./ics/${code}.ics`;
    let data = '';
    let icsStr = '';
    let uidMap = new Map();

    let request = https.get(ics, function (response) {

      function read() {
        let chunk;
        while (chunk = response.read()) {
          data += chunk;
        }
      }

      response.on('readable', read);

      response.on('end', function () {
        fs.writeFileSync(filePath, data);
        icsStr = fs.readFileSync(filePath);
        uidMap = parseToMap(icsStr.toString());
      });
    });
  }
  return uidMap;
}

module.exports.icsToCSV = icsToCSV;