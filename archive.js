// //const noDups = _.uniqBy(jsonArray, 'Survey Execution Id');
// // console.log('date', dateObj);
// // if(date) {
// //   const filtered = noDups.filter(record => Date.parse(record['Survey Date']) > Date.parse(dateObj));
// //   console.log('filtered', filtered);
// //   const csv = JSONToCSV(filtered);
// //   fs.writeFileSync("./destination.csv", csv);
// // } else {
// //   console.log('output',noDups );
// //   fs.writeFileSync("./destination.csv", noDups);
// // }
//
//
// // const dateObj = new Date(date);
//
//
// const fs = require('fs');
// const csv=require('csvtojson');
// const JSONToCSV = require("json2csv").parse;
// const _ = require('lodash');
//
//
// const arg = process.argv.slice(2);
// // console.log('1st arg: ', arg);
// const file = arg[0];
// console.log('Processing -->', file);
// const file2 = arg[1];
// console.log('Processing -->', file2);
//
//
// const filePath = `./${file}`;
// const filePath2 = `./${file}`;
//
// async function convertToJson() {
//   let records = [];
//   console.log('start first file');
//   const jsonArray  = await csv().fromFile(filePath);
//   jsonArray.forEach(row => {
//     if(records.some(e => e.email === row.Email)) {
//       let index = records.findIndex(element => element.email === row.Email);
//       if(row['Survey Answer'].includes('haven\'t'))
//         records[index]["no issues (react survey only)"] = true;
//       if(row['Survey Answer'].includes('popped'))
//         records[index]["Pops up unexpected errors (react survey only)"] = true;
//       if(row['Survey Answer'].includes('ran into'))
//         records[index]["ran into issue - couldn't complete task"] = true;
//       if(row['Survey Answer'].includes('crashed'))
//         records[index]["ui crash"] = true;
//       if(row['Survey Answer'].includes('missing in'))
//         records[index]["Missing feature"] = true;
//       if(row['Survey Answer'].includes('running more slowly'))
//         records[index]["performance issue"] = true;
//       if(row['Survey Answer'].includes('it\'s hard'))
//         records[index]["ux hard to find way  around new ui"] = true;
//       if(row['Survey Question Type'].includes('OPEN_TEXT'))
//         records[index]["user feedback"] = row['Survey Answer'];
//
//     } else {
//       let ui_crash = '';
//       let no_issues = '';
//       let performance = '';
//       let missing_feature = '';
//       let other_issue = '';
//       let pops_up ='';
//       let ran_into = '';
//       let ux_hard = '';
//       let open_text = '';
//       if(row['Survey Answer'].includes('haven\'t'))
//         no_issues = true;
//       if(row['Survey Answer'].includes('popped'))
//         pops_up = true;
//       if(row['Survey Answer'].includes('ran into'))
//         ran_into = true;
//       if(row['Survey Answer'].includes('crashed'))
//         ui_crash = true;
//       if(row['Survey Answer'].includes('missing in'))
//         missing_feature = true;
//       if(row['Survey Answer'].includes('running more slowly'))
//         performance = true;
//       if(row['Survey Answer'].includes('it\'s hard'))
//         ux_hard = true;
//       if(row['Survey Question Type'].includes('OPEN_TEXT'))
//         open_text = row['Survey Answer'];
//       let newRecord = {
//         "first name": row['First Name'],
//         "last name": row['Last Name'],
//         type: '',
//         persona: '',
//         email: row['Email'],
//         company: row['Company Name'],
//         "date interviewed/responded to survey": row['Survey Date'].toString().split('T')[0],
//         job: '',
//         "integration apps": '',
//         "features most used": '',
//         "legacy switches or react survey": '',
//         "ui crash": ui_crash,
//         "no issues (react survey only)": no_issues,
//         "performance issue": performance,
//         "Missing feature": missing_feature,
//         "Other issue": other_issue,
//         "Pops up unexpected errors (react survey only)": pops_up,
//         "ran into issue - couldn't complete task": ran_into,
//         "ux hard to find way  around new ui": ux_hard,
//         "user feedback": open_text,
//         "Celigo follow-up": '',
//         likes: '',
//         dislikes: '',
//         "most common features": '',
//         "suggestions": '',
//         bugs: '',
//         enhancements: '',
//         "enhancement status": '',
//         "can put us in  touch with  others": '',
//         "recording (only available in zoom for limited time)": '',
//         "User-reported scenarios and user comments": '',
//         "sent notes to customer team": '',
//         "Survey ID": row['Survey Execution Id']
//       };
//       records.push(newRecord);
//       console.log(records.length);
//     }
//   });
//
//   console.log('Finsihed first File');
//   console.log('start second file');
//   const jsonArray2  = await csv().fromFile(filePath2);
//   console.log('second json', jsonArray2);
//   jsonArray2.forEach(row => {
//     if(records.some(e => e.email === row.Email)) {
//       console.log('found record');
//       let index = records.findIndex(element => element.email === row.Email);
//       if(row['Survey Answer'].includes('haven\'t'))
//         records[index]["no issues (react survey only)"] = true;
//       if(row['Survey Answer'].includes('popped'))
//         records[index]["Pops up unexpected errors (react survey only)"] = true;
//       if(row['Survey Answer'].includes('ran into'))
//         records[index]["ran into issue - couldn't complete task"] = true;
//       if(row['Survey Answer'].includes('crashed'))
//         records[index]["ui crash"] = true;
//       if(row['Survey Answer'].includes('isn\'t available'))
//         records[index]["Missing feature"] = true;
//       if(row['Survey Answer'].includes('performance issues'))
//         records[index]["performance issue"] = true;
//       if(row['Survey Answer'].includes('it\'s hard'))
//         records[index]["ux hard to find way  around new ui"] = true;
//       if(row['Survey Question Type'].includes('OPEN_TEXT'))
//         records[index]["user feedback"] = row['Survey Answer'];
//
//     } else {
//       console.log('add record');
//       let ui_crash = '';
//       let no_issues = '';
//       let performance = '';
//       let missing_feature = '';
//       let other_issue = '';
//       let pops_up ='';
//       let ran_into = '';
//       let ux_hard = '';
//       let open_text = '';
//       if(row['Survey Answer'].includes('haven\'t'))
//         no_issues = true;
//       if(row['Survey Answer'].includes('popped'))
//         pops_up = true;
//       if(row['Survey Answer'].includes('ran into'))
//         ran_into = true;
//       if(row['Survey Answer'].includes('crashed'))
//         ui_crash = true;
//       if(row['Survey Answer'].includes('isn\'t available'))
//         missing_feature = true;
//       if(row['Survey Answer'].includes('performance issues'))
//         performance = true;
//       if(row['Survey Answer'].includes('it\'s hard'))
//         ux_hard = true;
//       if(row['Survey Question Type'].includes('OPEN_TEXT'))
//         open_text = row['Survey Answer'];
//       let newRecord = {
//         "first name": row['First Name'],
//         "last name": row['Last Name'],
//         type: '',
//         persona: '',
//         email: row['Email'],
//         company: row['Company Name'],
//         "date interviewed/responded to survey": row['Survey Date'].toString().split('T')[0],
//         job: '',
//         "integration apps": '',
//         "features most used": '',
//         "legacy switches or react survey": '',
//         "ui crash": ui_crash,
//         "no issues (react survey only)": no_issues,
//         "performance issue": performance,
//         "Missing feature": missing_feature,
//         "Other issue": other_issue,
//         "Pops up unexpected errors (react survey only)": pops_up,
//         "ran into issue - couldn't complete task": ran_into,
//         "ux hard to find way  around new ui": ux_hard,
//         "user feedback": open_text,
//         "Celigo follow-up": '',
//         likes: '',
//         dislikes: '',
//         "most common features": '',
//         "suggestions": '',
//         bugs: '',
//         enhancements: '',
//         // "enhancement status": '',
//         "can put us in  touch with  others": '',
//         "recording (only available in zoom for limited time)": '',
//         "User-reported scenarios and user comments": '',
//         "sent notes to customer team": '',
//         "Survey ID": row['Survey Execution Id']
//       };
//       records.push(newRecord);
//       console.log(records.length);
//     }
//   });
//   console.log('Finsihed second File');
//   return records;
//
// }
//
// async function writeOutput(records) {
//   const csv = JSONToCSV(records);
//   fs.writeFileSync("./destination.csv", csv);
// }
//
//
// async function runner() {
//   const jsonRecords = await convertToJson();
//   writeOutput(jsonRecords);
// }
//
//
//
// runner();
//
