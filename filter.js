const fs = require('fs');
const csv = require('csvtojson');
const JSONToCSV = require("json2csv").parse;

async function convertToJson(file) {

  const filePath = `./${file}`;
  const jsonArray  = await new csv().fromFile(filePath);

  console.log('Rows converted to json', jsonArray.length);
  return jsonArray;

}

async function combineJson(json1, json2) {
  let records = [];
  // console.log(json1.length);
  json1.forEach(row => {
    if(records.some(e => e.email === row.Email)) {
      let index = records.findIndex(element => element.email === row.Email);
      if(row['Survey Answer'].includes('haven\'t'))
        records[index]["no issues (react survey only)"] = true;
      if(row['Survey Answer'].includes('popped'))
        records[index]["Pops up unexpected errors (react survey only)"] = true;
      if(row['Survey Answer'].includes('ran into'))
        records[index]["ran into issue - couldn't complete task"] = true;
      if(row['Survey Answer'].includes('crashed'))
        records[index]["ui crash"] = true;
      if(row['Survey Answer'].includes('missing in'))
        records[index]["Missing feature"] = true;
      if(row['Developer Mode'].includes('TRUE'))
        records[index]["Missing feature"] = true;
      if(row['Survey Answer'].includes('running more slowly'))
        records[index]["performance issue"] = true;
      if(row['Survey Answer'].includes('hard to find my'))
        records[index]["ux hard to find way  around new ui"] = true;
      if(row['Survey Question Type'].includes('OPEN_TEXT'))
        records[index]["user feedback"] = row['Survey Answer'];
      if(row['Developer Mode'].toLowerCase().includes('true'))
        records[index]['persona'] = 'Ad hoc integrator';
      records[index]["Integration apps/Subscriptions"] = row["Account Active Subscriptions"] ? row["Account Active Subscriptions"] : records[index]["Integration apps/Subscriptions"];

    } else {
      let ui_crash = '';
      let no_issues = '';
      let performance = '';
      let missing_feature = '';
      let other_issue = '';
      let pops_up ='';
      let ran_into = '';
      let ux_hard = '';
      let open_text = '';
      if(row['Survey Answer'].includes('haven\'t'))
        no_issues = true;
      if(row['Survey Answer'].includes('popped'))
        pops_up = true;
      if(row['Survey Answer'].includes('ran into'))
        ran_into = true;
      if(row['Survey Answer'].includes('crashed'))
        ui_crash = true;
      if(row['Survey Answer'].includes('missing in'))
        missing_feature = true;
      if(row['Survey Answer'].includes('running more slowly'))
        performance = true;
      if(row['Survey Answer'].includes(' hard to find my'))
        ux_hard = true;
      if(row['Survey Question Type'].includes('OPEN_TEXT'))
        open_text = row['Survey Answer'];
      let newRecord = {
        "first name": row['First Name'],
        "last name": row['Last Name'],
        email: row['Email'],
        company: row['Company Name'],
        "Integration apps/Subscriptions": row['Account Active Subscriptions'],
        type: '',
        persona: row['Survey Question Type'].includes('TRUE') ? 'Ad hoc integrator' : 'Citizen integrator',
        visits: row['Account Number Of Visits'],
        flows: row['Account IO Flows Total'],
        "date interviewed/responded to survey": row['Survey Date'].toString().split('T')[0],
        job: '',
        "features most used": '',
        "legacy switches or react survey": 'React',
        "ui crash": ui_crash,
        "no issues (react survey only)": no_issues,
        "performance issue": performance,
        "Missing feature": missing_feature,
        "Other issue": other_issue,
        "Pops up unexpected errors (react survey only)": pops_up,
        "ran into issue - couldn't complete task": ran_into,
        "ux hard to find way  around new ui": ux_hard,
        connector: '',
        "user feedback": open_text,
        "Celigo follow-up": '',
        likes: '',
        dislikes: '',
        "most common features": '',
        "suggestions": '',
        bugs: '',
        enhancements: '',
        "enhancement status": '',
        "can put us in  touch with  others": '',
        "recording (only available in zoom for limited time)": '',
        "User-reported scenarios and user comments": '',
        "sent notes to customer team": '',
        "Survey ID": row['Survey Execution Id']
      };
      records.push(newRecord);
    }
  });


  // console.log(json2.length);
  json2.forEach(row => {
    if(records.some(e => e.email === row.Email)) {
      // console.log('found record');
      let index = records.findIndex(element => element.email === row.Email);
      // console.log('update record', index);
      if(row['Survey Answer'].includes('haven\'t'))
        records[index]["no issues (react survey only)"] = true;
      if(row['Survey Answer'].includes('popped'))
        records[index]["Pops up unexpected errors (react survey only)"] = true;
      if(row['Survey Answer'].includes('ran into'))
        records[index]["ran into issue - couldn't complete task"] = true;
      if(row['Survey Answer'].includes('crashed'))
        records[index]["ui crash"] = true;
      if(row['Survey Answer'].includes('isn\'t available'))
        records[index]["Missing feature"] = true;
      if(row['Survey Answer'].includes('performance issues'))
        records[index]["performance issue"] = true;
      if(row['Survey Answer'].includes(' hard to find my')) {
        if (row['Account Active Subscriptions'].toLowerCase().indexOf("connector") === -1  && row['Account Active Subscriptions'].toLowerCase().indexOf("manager") === -1)
          ux_hard = true;
      }
      if(row['Account Active Subscriptions'].includes('Connector'))
        records[index]["connector"] = 'connector';
      if(row['Account Active Subscriptions'].includes('Manager'))
        records[index]["connector"] = 'manager';
      if(row['Survey Question Type'].includes('OPEN_TEXT'))
        records[index]["user feedback"] = row['Survey Answer'];
      if(row['Developer Mode'].toLowerCase().includes('true')){
        // console.log('found a dev mode true');
        // console.log(records[index]['persona']);
        records[index]['persona'] = 'Ad hoc integrator';
        // console.log(records[index]['persona']);
      }

      records[index]["Integration apps/Subscriptions"] = row["Account Active Subscriptions"] ? row["Account Active Subscriptions"] : records[index]["Integration apps/Subscriptions"];

    } else {
      // console.log('add record', records.length);
      let ui_crash = '';
      let no_issues = '';
      let performance = '';
      let missing_feature = '';
      let other_issue = '';
      let pops_up ='';
      let ran_into = '';
      let ux_hard = '';
      let open_text = '';
      let connect = '';

      if(row['Survey Answer'].includes('haven\'t'))
        no_issues = true;
      if(row['Survey Answer'].includes('popped'))
        pops_up = true;
      if(row['Survey Answer'].includes('ran into'))
        ran_into = true;
      if(row['Survey Answer'].includes('crashed'))
        ui_crash = true;
      if(row['Survey Answer'].includes('isn\'t available'))
        missing_feature = true;
      if(row['Survey Answer'].includes('performance issues'))
        performance = true;
      if(row['Survey Answer'].includes(' hard to find my')) {
        if (row['Account Active Subscriptions'].toLowerCase().indexOf("connector") === -1  && row['Account Active Subscriptions'].toLowerCase().indexOf("manager") === -1)
          ux_hard = true;
      }
      if(row['Account Active Subscriptions'].includes('Connector'))
        connect = 'connector';
      if(row['Account Active Subscriptions'].includes('Manager'))
        connect = 'manager';
      if(row['Survey Question Type'].includes('OPEN_TEXT'))
        open_text = row['Survey Answer'];
      let newRecord = {
        "first name": row['First Name'],
        "last name": row['Last Name'],
        email: row['Email'],
        company: row['Company Name'],
        "Integration apps/Subscriptions": row['Account Active Subscriptions'],
        type: '',
        persona: row['Survey Question Type'].includes('TRUE') ? 'Ad hoc integrator' : 'Citizen integrator',
        visits: row['Account Number Of Visits'],
        flows: row['Account IO Flows Total'],
        "date interviewed/responded to survey": row['Survey Date'].toString().split('T')[0],
        job: '',
        "features most used": '',
        "legacy switches or react survey": 'Legacy',
        "ui crash": ui_crash,
        "no issues (react survey only)": no_issues,
        "performance issue": performance,
        "Missing feature": missing_feature,
        "Other issue": other_issue,
        "Pops up unexpected errors (react survey only)": pops_up,
        "ran into issue - couldn't complete task": ran_into,
        "ux hard to find way  around new ui": ux_hard,
        connector: connect,
        "user feedback": open_text,
        "Celigo follow-up": '',
        likes: '',
        dislikes: '',
        "most common features": '',
        "suggestions": '',
        bugs: '',
        enhancements: '',
         "enhancement status": '',
        "can put us in  touch with  others": '',
        "recording (only available in zoom for limited time)": '',
        "User-reported scenarios and user comments": '',
        "sent notes to customer team": '',
        "Survey ID": row['Survey Execution Id']
      };
      records.push(newRecord);
   }
  });

  return records;

}

async function writeOutput(records) {
  const csv = JSONToCSV(records);
  fs.writeFileSync("./destination.csv", csv);
}


async function runner() {
  const arg = process.argv.slice(2);
  console.log('Supplied files: ', arg);
  const argfile = arg[0];
  const argfile2 = arg[1];
  console.log('Processing -->', argfile);
  const jsonFromCsv1 = await convertToJson(argfile);
  console.log('Processing -->', argfile2);
  const jsonFromCsv2 = await convertToJson(argfile2);
  const newRecords = await combineJson(jsonFromCsv1, jsonFromCsv2);
  writeOutput(newRecords);
}



runner();
