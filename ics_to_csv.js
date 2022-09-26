const { getCalendar } = require('./canvas')
const fs = require('fs');
const https = require('https');
require('./icys');

function downloadLink(link, filePath) {
  return new Promise((resolve) => {
    let file = fs.createWriteStream(filePath);
    let request = https.get(link, (response) => {
      response.pipe(file);
      // file.once('finish', icsToCSV () {

      // })
    });
    resolve();
  });
}

// function downloadLink(link, filePath) {
//     let file = fs.createWriteStream(filePath);
//     let request = https.get(link, (response) => {
//       response.pipe(file);
//   });
// }


async function icsToCSV () {
  const session = '2022W1';
  const courseMap = await getCalendar(session);

  for ( let entry of courseMap.entries() ) {
    let code = entry[0].replaceAll(' ', '_').replaceAll('/', '');
    let ics = entry[1];

    // let filePath = `./ics/${code}.ics`;
    let data = '';
    let dataList = [];

    let request = https.get(ics, function(response) {

      function read() {
        let chunk;
        while ( chunk = response.read() ) {
          data += chunk;    
        }
      }

      response.on('readable', read);

      response.on('end', function() {
        // console.log('[%s]', data);
        const icy = new IcyS(ics, true);
      });
    });

    // await downloadLink(ics, filePath);
    // then(
    //   fs.readFile(filePath, (err, icsData) => {
    //     if (err) {
    //       console.log(err);
    //       return;
    //     }
    //     console.log(icsData);
    // })
    // );
}
}

icsToCSV();