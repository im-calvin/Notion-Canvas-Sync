const getCalendar = require('./canvas')

function convertTime(dtStart) {
  if (dtStart.length == 8) {
    dtStart = dtStart.slice(0, 4) + '-' + dtStart.slice(4, 6) + '-' + dtStart.slice(6, 8);
    const date = new Date(dtStart);
    return date.toISOString();
  }
  dtStart = dtStart.slice(0, 4) + '-' + dtStart.slice(4, 6) + '-' + dtStart.slice(6, 11) + ':' + dtStart.slice(11, 13) + ':' + dtStart.slice(13);
  const date = new Date(dtStart);
  return date.toISOString(); 
}

function parseToMap(icsStr, uidMap) {

  while (icsStr.search("BEGIN:VEVENT") != -1) {
    icsStr = icsStr.substring(icsStr.search("UID:"));
    
    let uid = icsStr.substring(4, icsStr.search('\r'));
    
    icsStr = icsStr.substring(icsStr.search("DTSTART"));
    
    let dtStart = icsStr.substring(8, icsStr.search('\r'));
    
    if (dtStart.startsWith('V')) {
      dtStart = dtStart.substring(22, icsStr.search('\r'));
    }
    dtStart = convertTime(dtStart);

    icsStr = icsStr.substring(icsStr.search("SUMMARY:"));

    let summary = icsStr.substring(8, icsStr.search('\\[') - 1);

    className = icsStr.substring(icsStr.search('\\[') + 1, icsStr.search('\\[') + 9);

    if (summary.includes('\r\n')) {
      icsStr = icsStr.replace('\r\n', ''); 
      className = icsStr.substring(icsStr.search('\\[') + 1, icsStr.search('\\[') + 9);
      console.log(icsStr.substring(icsStr.search('\\[') + 1, icsStr.search('\\[') + 9));
      uidMap.set(uid, [dtStart, summary, false, className]);
      continue;
    }

    uidMap.set(uid, [dtStart, summary, false, className]);

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
  
  return uidMap;
}

icsToCSV();

module.exports = icsToCSV;