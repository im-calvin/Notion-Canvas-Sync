const getCalendar = require('./canvas')
const fs = require('fs');
const https = require('https');

function parseToMap(icsStr, uidMap) {

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

  }

}

async function icsToCSV() {
  const session = '2022W1';
  const pageMap = await getCalendar(session);

  let uidMap = new Map();

  for (let entry of pageMap.entries()) {
    let ics = entry[1];

    const response = await fetch(ics);
    parseToMap(await response.text(), uidMap);
  }
  
  console.log(uidMap);
  return uidMap;
}

module.exports = icsToCSV;