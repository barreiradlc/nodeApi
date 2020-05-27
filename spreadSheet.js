const { GoogleSpreadsheet } = require('google-spreadsheet');

const doc = new GoogleSpreadsheet('1AJbjLg4o_ImhEiuuTfuWOiYpJuGFsyeF-TdCnjyDuaw')

// const { promisify } = require('util')

// const creds = require('./services/client_secrets.json')

async function accessSpreadsheet() {

//     await promisify(doc.useServiceAccountAuth)(creds);


//     const info = await promisify(doc.getIInfo)()

//     const sheet = info.worksheets[0]

//     console.log(`Title ${sheet.title}, Rows ${sheet.rowCount}`)


// accessSpreadsheet()

await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
});
// OR load directly from json file if not in secure environment
await doc.useServiceAccountAuth(require('./services/client_secrets.json'));
// OR use API key -- only for read-only access to public sheets
doc.useApiKey('YOUR-API-KEY');

await doc.loadInfo(); // loads document properties and worksheets
console.log(doc.title);
await doc.updateProperties({ title: 'renamed doc' });

const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
console.log(sheet.title);
console.log(sheet.rowCount);

// adding / removing sheets
const newSheet = await doc.addSheet({ title: 'hot new sheet!' });
await newSheet.delete();

}

accessSpreadsheet()